const axios = require('axios');
const { config } = require('dotenv');
const ExpressError = require('../express/expressError');
config();
const PRO_API_KEY = process.env.PRO_API_KEY
const CONGRESS_API_KEY = process.env.CONGRESS_API_KEY

// This class organizes helper functions when dealing with an API
// May refactor API_Data functions into it's own class, reference in functions as needed to clean data

class API_Utilities {
    async getCongressMembers() {
        // Returns Array of Sanatized Member Objects to input into Congress DB Table
        console.log("getting base data from api");
        try {
            const senateReq = await axios({
                method: 'get',
                url: 'https://api.propublica.org/congress/v1/117/senate/members.json',
                headers: { 'Content-Type': 'application/json', 'X-Api-Key': PRO_API_KEY }
            });

            console.log("Received Senate Members");

            const houseReq = await axios({
                method: 'get',
                url: 'https://api.propublica.org/congress/v1/117/house/members.json',
                headers: { 'Content-Type': 'application/json', 'X-Api-Key': PRO_API_KEY }
            })

            console.log("Received House Members");

            const senateResp = senateReq.data.results[0];
            const houseResp = houseReq.data.results[0];

            // pass each response to the data scrubbing functions

            const cleanSenate = this.cleanUpMembers(senateResp);
            const cleanHouse = this.cleanUpMembers(houseResp);

            console.log("Senate and House member Data cleaned");

            // return full array of all members from senate and house

            return [...cleanSenate, ...cleanHouse];
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }

    cleanUpMembers(data) {
        // Returns Array of clean member objects
        const cleanArray = [];
        const chamber = data.chamber;

        data.members.forEach(member => {
            const data = {
                "id": member.id,
                "first_name": member.first_name,
                "last_name": member.last_name,
                "state": member.state,
                "party": member.party,
                "dob": member.date_of_birth,
                "site": member.url,
                "api_url": member.api_uri,
                chamber
            }
            cleanArray.push(data);
        });

        return cleanArray;
    }

    async getSecondaryMemberInfo(url, id) {
        // Requests additional Member info, sanatizes it, and updates the associated Congress Member.

        console.log("Requesting secondary member data");
        try {
            const photoReq = await axios({
                method: 'get',
                url: `https://api.congress.gov/v3/member/${id}`,
                headers: { 'Content-Type': 'application/json', 'X-Api-Key': CONGRESS_API_KEY }
            });

            const dataReq = await axios({
                method: 'get',
                url,
                headers: { 'Content-Type': 'application/json', 'X-Api-Key': PRO_API_KEY }
            });

            console.log("Received secondary member data");

            const dataRes = dataReq.data.results[0];
            const photo = photoReq.data.member.depiction.imageUrl;

            const date = new Date();
            const year = date.getFullYear();

            const roles = dataRes.roles;

            const currCongress = roles[0];
            const lastCongress = roles[(Object.keys(roles).length - 1)];

            const years_served = year - parseInt(lastCongress.start_date.slice(0, 4));

            console.log("Scrubbing secondary member data...");

            const addData = {
                id,
                "total_votes": currCongress.total_votes,
                "missed_votes": currCongress.missed_votes,
                "bills_sponsored": currCongress.bills_sponsored,
                "bills_cosponsored": currCongress.bills_cosponsored,
                "votes_with_party_pct": currCongress.votes_with_party_pct,
                "socials": {
                    "twitter": dataRes.twitter_account ? `https://twitter.com/${dataRes.twitter_account}` : null,
                    "facebook": dataRes.facebook_account ? `https://facebook.com/${dataRes.facebook_account}` : null,
                    "youtube": dataRes.youtube_account ? `https://youtube.com/${dataRes.youtube_account}` : null
                },
                years_served,
                photo
            }

            console.log("Secondary member data cleaned");

            // Returns the cleaned additional data for the member

            return addData;
        } catch (error) {
            throw new ExpressError(error.message, error.status);
        }
    }
}

const API_Utils = new API_Utilities();

module.exports = API_Utils
