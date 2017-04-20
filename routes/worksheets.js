/*jslint node: true*/
/*jslint nomen: true*/
'use strict';

var express = require("express"),
    router = express.Router(),
    Participant = require('../models/participant'),
    User = require('../models/user'),
    Worksheet = require('../models/worksheet');

// worksheet index
router.get('/', function (req, res) {
    var totalWorksheets = 0;
    Worksheet.count({}, function (err, count) {
        if (err) {
            console.log(err);
        }
        Worksheet.find({}, function (err, foundWorksheets) {
            if (err) {
                console.log(err);
            } else if (count === 0) {
                res.render('worksheets/index.njk', {
                    worksheets: foundWorksheets
                });
            } else {
                foundWorksheets.forEach(function (worksheet) {
                    worksheet.prettyDate = new Date(worksheet.created).toLocaleDateString();
                    totalWorksheets += 1;
                    if (totalWorksheets === count) {
                        res.render('worksheets/index.njk', {
                            worksheets: foundWorksheets
                        });
                    }
                });
            }
        });
    });
});

// new worksheet form
router.get('/new', function (req, res) {
    res.render('worksheets/new.njk');
});

// create new worksheet
router.post('/', function (req, res) {
    // TODO: use the logged in user here instead of finding the admin user
    User.findOne({username: "admin"}, function (err, foundUser) {
        var newWorksheet = req.body.worksheet;
        newWorksheet.created = new Date();
        newWorksheet.inactive_on = null;
        newWorksheet.is_locked = null;
        newWorksheet.author = foundUser;
        newWorksheet.assessments = [];
        Worksheet.create(newWorksheet, function (err, createdWorksheet) {
            if (err) {
                console.log("Watch out! Your about to get a fail pie right to the face!");
                console.log(err);
            }
            res.redirect('/worksheets');
        });
    });
});

// show a worksheet and its assessments
router.get('/:id', function (req, res) {
    var id = req.params.id;
    Worksheet.findById(id, function (err, foundWorksheet) {
        if (err) {
            console.log(err);
        }
        Participant.find({}, function (err, foundParticipants) {
            res.render('worksheets/show.njk', {
                worksheet: foundWorksheet,
                participants: foundParticipants
            });
        });
    });
});

// create and append a new assessment to a worksheet
router.post('/:id', function (req, res) {
    var id = req.params.id,
        newAssessment = req.body.assessment,
        cardio = {
            type: newAssessment.cardio_type,
            time: newAssessment.cardio_time,
            heart_rate: newAssessment.cardio_heartrate
        };
    newAssessment.inactive_on = null;
    newAssessment.created = new Date();
    newAssessment.cardio = cardio;
    Worksheet.findById(id, function (err, foundWorksheet) {
        if (err) {
            console.log(err);
        }
        Participant.findOne({
            'dept_id': newAssessment.dept_id
        }, function (err, foundParticipant) {
            newAssessment.participant = foundParticipant;
            foundWorksheet.assessments.push(newAssessment);
            foundWorksheet.save(function (err, updatedWorksheet) {
                if (err) {
                    console.log(err);
                }
                res.redirect("/worksheets/" + id);
            });
        });
    });
});

// remove an assessment from a worksheet
router.delete('/:worksheet_id/:assessment_id', function (req, res) {
    var worksheetID = req.params.worksheet_id,
        assessmentID = req.params.assessment_id;
    Worksheet.update({
        _id: worksheetID
    }, {
        $pull: {
            assessments: {
                _id: assessmentID
            }
        }
    }, function (err, obj) {
        if (err) {
            console.log(err);
        }
        res.redirect("/worksheets/" + worksheetID);
    });
});

module.exports = router;
