# Dispatch

## Problem

When a new delivery is submitted to the system, we want to dispatch a crew to fulfil the order.

Your task is to create a function that will return the best crew to fulfil the order.

For your convenience, a `data.json` file has been provided with crew examples.

**Input 1:** An order that has been submitted

```
{
  vehicle: "pickup_truck", // Minimum required vehicle
  start_hour: 9, // Hour that the job will begin
  end_hour: 10, // Hour that the job will be completed by
}
```

**Input 2:** A list of crews (schedule and basic information included)

```
[
  {
    "id": 1,
    "vehicle": "pickup_truck", // Vehicle the crew is using
    "schedule": [ // Orders that are already assigned to the crew
      {
        "start_hour": 11,
        "end_hour": 12
      }
    ]
  },
...
]
```

**Output:** The crew ID best fit for the job, or `-1` if no crew can fulfil the order.

```
1
```

## Notes

- A crew cannot fulfil an order if they have a schedule conflict. The crew must be available for the entire time interval.
- Crews need the minimum size vehicle for the order, but not all costs are the same: `sedan` < `pickup_truck` < `box_truck`
  - `sedan` can only fit orders of type `sedan`
  - `pickup_truck` can fit orders of type `sedan` and `pickup_truck`, but vehicle space will be wasted if `sedan` is chosen.
  - `box_truck` can fit any vehicle type, but a `pickup_truck` will waste space, and `sedan` will waste even more.

## Examples

### Schedule conflicts

In this scenario, no crew is available due to a conflict in schedules

**Input:**

```
[{
  "id": 1,
  "vehicle": "pickup_truck",
  "schedule": [
    {
      "start_hour": 9,
      "end_hour": 12
    }
  ]
}, {
  "id": 2,
  "vehicle": "pickup_truck",
  "schedule": [
    {
      "start_hour": 13,
      "end_hour": 14
    }
  ]
}]

{
  vehicle: "pickup_truck",
  start_hour: 10,
  end_hour: 14,
}
```

**Output:** `-1`

### Best Cost

In this scenario, the optimal vehicle for the order has a conflict, so we dispatch crew ID 2.

**Input:**

```
[{
  "id": 1,
  "vehicle": "box_truck",
  "schedule": []
}, {
  "id": 2,
  "vehicle": "pickup_truck",
  "schedule": []
},
{
  "id": 3,
  "vehicle": "sedan",
  "schedule": [
    {
      "start_hour": 10,
      "end_hour": 12
    }
  ]
}]

{
  vehicle: "sedan",
  start_hour: 10,
  end_hour: 14,
}
```

**Output:** `2`

## What are we looking for

We'll evaluate your code via the following guidelines in no particular order:

1. **Readability**: naming, spacing, consistency
2. **Correctness**: is the solution correct and does it solve the problem
3. **Test Code Quality**: Is the test code comperehensive and covering all cases.
4. **Tool/Language mastery**: is the code using up to date syntax and techniques.
