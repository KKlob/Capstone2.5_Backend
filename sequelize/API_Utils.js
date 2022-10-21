const axios = require('axios');
const { config } = require('dotenv');

config();

const PRO_API_KEY = process.env.PRO_API_KEY

class API_Utilities {
    async getCongressMembers() {
        // Returns Array of Sanatized Member Objects to input into Congress DB Table
        console.log("getting base data from api");
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

        const cleanSenate = this.cleanUpMembers(senateResp);
        const cleanHouse = this.cleanUpMembers(houseResp);

        console.log("Senate and House member Data cleaned");

        return [...cleanSenate, ...cleanHouse];

    }

    cleanUpMembers(data) {
        // Returns Array of clean member objects
        const cleanArray = [];
        const chamber = data.chamber;

        data.members.forEach(member => {
            const data = {
                "id": member.id,
                "name": `${member.first_name} ${member.last_name}`,
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

    async getSecondaryMemberInfo(url) {
        // Requests additional Member info and returns clean addData object
        const dataReq = await axios({
            method: 'get',
            url,
            headers: { 'Content-Type': 'application/json', 'X-Api-Key': PRO_API_KEY }
        });

        const dataRes = dataReq.data.results[0];

        const date = new Date();
        const year = date.getFullYear();

        const roles = dataRes.roles;

        const currCongress = roles[0];
        const lastCongress = roles[(Object.keys(roles).length - 1)];

        const years_served = year - parseInt(lastCongress.start_date.slice(0, 4));

        const addData = {
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
            years_served
        }

        return addData;
    }
}

const API_Utils = new API_Utilities();

module.exports = API_Utils