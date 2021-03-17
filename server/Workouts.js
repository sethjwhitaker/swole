import express from 'express';

const router = express.Router();


router.get("/", (req, res) => {
    // return all the workouts for that user
    // Must be authenticated
    // Get user id from token
    res.send("Workouts");
});

router.get("/:workoutId", (req, res) => {
    // return workout to user
    // must be authenticated
    // double check that user id on workout matches token
    res.send("Workout");
});

router.get("/:day", (req, res) => {
    // return all workouts on specific day that belong to user
    // must be authenticated

    res.send("Workout");
});

router.post("/add", (req, res) => {
    // add workout
    // should pass json with all necessary data
    // must be authenticated
}); 

export default router;