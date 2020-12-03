const vehicleCapacity = {
  "sedan": 1,
  "pickup_truck": 2,
  "box_truck": 3
};

const crewInfo = {
  "crews": [
    {
      "id": 1,
      "vehicle": "pickup_truck",
      "schedule": [
        {
          "start_hour": 11,
          "end_hour": 12
        }
      ]
    },
    {
      "id": 2,
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
      "id": 3,
      "vehicle": "pickup_truck",
      "schedule": [
        {
          "start_hour": 9,
          "end_hour": 11
        },
        {
          "start_hour": 14,
          "end_hour": 17
        },
        {
          "start_hour": 18,
          "end_hour": 19
        }
      ]
    },
    {
      "id": 4,
      "vehicle": "box_truck",
      "schedule": []
    }
  ]
};

const orderInfo = {
  vehicle: "pickup_truck",
  start_hour: 9,
  end_hour: 10,
};

const isScheduleConflicting = (orderStart, orderEnd, crewStart, crewEnd) => {
  return (orderStart == crewStart || orderEnd == crewEnd) ||
    (orderStart == crewEnd || orderEnd == crewStart) ||
    (orderStart < crewStart && orderEnd > crewEnd);
}

export default function getOptimalCrew(crewInfo, orderInfo) {
  let optimalCrewId = -1;
  const startHour = orderInfo.start_hour;
  const endHour = orderInfo.end_hour;
  const orderVehicle = orderInfo.vehicle;
  const crewsList = [];

  crewInfo.crews && crewInfo.crews.forEach(crew => {
    crew.schedule &&
      crew.schedule.every(timeSlot => !isScheduleConflicting(startHour, endHour, timeSlot.start_hour, timeSlot.end_hour)) &&
      crewsList.push(crew);
  });

  crewsList.filter(crew => vehicleCapacity[orderVehicle] <= vehicleCapacity[crew.vehicle])
    .forEach(crew => {
      crew.vehicleEfficiency = vehicleCapacity[crew.vehicle] - vehicleCapacity[orderVehicle];
    });

  const sortedByOptimality = crewsList.sort((vehicle1, vehicle2) => vehicle1.vehicleEfficiency - vehicle2.vehicleEfficiency);
  optimalCrewId = sortedByOptimality[0] && sortedByOptimality[0]['id'] || optimalCrewId;

  console.log(optimalCrewId);

  return optimalCrewId;
};

getOptimalCrew(crewInfo, orderInfo);


