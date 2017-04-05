/*jslint node: true */
"use strict";

// dummy test data, not actual PII

var participantData = [
    {
        "name": {
            "first": "Jimmy",
            "last": "Couch"
        },
        "dept_id": "154",
        "dob": "5/9/1980",
        "sex": "m",
        "group": "pd"
    },
    {
        "name": {
            "first": "Sarah",
            "last": "Smatters"
        },
        "dept_id": "475",
        "dob": "3/8/1971",
        "sex": "f",
        "group": "pd"
    },
    {
        "name": {
            "first": "Skip",
            "last": "Phillips"
        },
        "dept_id": "653",
        "dob": "3/13/1968",
        "sex": "m",
        "group": "pd"
    },
    {
        "name": {
            "first": "Saul",
            "last": "Goodman"
        },
        "dept_id": "777",
        "dob": "5/3/1962",
        "sex": "m",
        "group": "applicant"
    }
];

var assessmentData = {
    inactive_on: null, // date inactivated
    created: "4/3/2017",
    participant: null, // object id added later
    worksheet: null, // object id added later
    eval_date: "4/3/2017",
    weight: 185,
    heart_rate: "72",
    blood_pressure: "120/80",
    body_fat: 15.2,
    flex: 27.5,
    situp: 51,
    bench: 225,
    press: 425,
    cardio: {
        type: "walk",
        time: 722, // in seconds
        heart_rate: 132
    }
};

var worksheetData = {
    inactive_on: null,
    created: "4/4/2017",
    is_locked: null,
    title: "Wellness Test Worksheet",
    author: null, // object ID
    assessments: [] // array of object IDs
};

var userData = [
    {
        username: "admin",
        email: "admin@tungsten.info",
        password: "admin",
        needs_reset: true,
        auth_level: "admin"
    },
    {
        username: "editor",
        email: "editor@tungsten.info",
        password: "editor",
        needs_reset: true,
        auth_level: "editor"
    },
    {
        username: "viewer",
        email: "viewer@tungsten.info",
        password: "viewer",
        needs_reset: true,
        auth_level: "viewer"
    }
];

var seedData = {
    assessmentData: assessmentData,
    participantData: participantData,
    userData: userData,
    worksheetData: worksheetData
};

module.exports = seedData;
