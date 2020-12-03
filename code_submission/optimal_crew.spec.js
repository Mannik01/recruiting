import getOptimalCrew from "./optimal_crew.js";
import assert from "assert";

describe("getOptimalCrew", () => {
    it("returns -1 when there are timing conflicts for an order", () => {
        const crewInfo = {
            "crews": [
                {
                    "id": 1,
                    "vehicle": "sedan",
                    "schedule": [
                        {
                            "start_hour": 9,
                            "end_hour": 10
                        },
                        {
                            "start_hour": 13,
                            "end_hour": 14
                        }
                    ]
                },
                {
                    "id": 2,
                    "vehicle": "pickup_truck",
                    "schedule": [
                        {
                            "start_hour": 8,
                            "end_hour": 9
                        }
                    ]
                }
            ]
        };

        const orderInfo = {
            vehicle: "pickup_truck",
            start_hour: 9,
            end_hour: 10,
        };

        assert.equal(getOptimalCrew(crewInfo, orderInfo), -1);
    });

    it("returns first crew id with the most optimal spacing which has no timing conflict", () => {
        const crewInfo = {
            "crews": [
                {
                    "id": 1,
                    "vehicle": "sedan",
                    "schedule": [
                        {
                            "start_hour": 7,
                            "end_hour": 8
                        },
                        {
                            "start_hour": 13,
                            "end_hour": 14
                        }
                    ]
                },
                {
                    "id": 2,
                    "vehicle": "pickup_truck",
                    "schedule": [
                        {
                            "start_hour": 8,
                            "end_hour": 9
                        }
                    ]
                },
                {
                    "id": 3,
                    "vehicle": "pickup_truck",
                    "schedule": [
                        {
                            "start_hour": 8,
                            "end_hour": 9
                        }
                    ]
                }
            ]
        };

        const orderInfo = {
            vehicle: "sedan",
            start_hour: 10,
            end_hour: 12,
        };

        assert.equal(getOptimalCrew(crewInfo, orderInfo), 1);
    });
})