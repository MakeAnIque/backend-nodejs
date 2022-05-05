/**
 * This must be in Database
 */

export const INTERVAL_MESSAGE_TYPE = [
  {
    name: 'DIABETES_CHECK',
    message: 'Please Check Your Diabetes',
    intervalRange: 2,
    intervalUnit: 'hour',
    cycleType: 'INTERVAL',
    time: {
      hour: 0,
      minute: 0,
    },
  },

  {
    name: 'BLOOD_PRESSURE',
    message: 'Please Check Your Blood Pressure',
    intervalRange: 3,
    intervalUnit: 'hour',
    cycleType: 'INTERVAL',
    time: {
      hour: 0,
      minute: 0,
    },
  },

  {
    name: 'BREAKFAST',
    message: 'Please Take Breakfast',
    intervalRange: 0,
    intervalUnit: 'hour',
    cycleType: 'ONE_TIME',
    time: {
      hour: 10,
      minute: 0,
    },
  },
  {
    name: 'LUNCH',
    intervalRange: 0,
    message: 'Please Take Lunch',
    intervalUnit: 'hour',
    cycleType: 'ONE_TIME',
    time: {
      hour: 15,
      minute: 0,
    },
  },
  {
    name: 'DINNER',
    message: 'Please Take Dinner',
    intervalRange: 0,
    intervalUnit: 'hour',
    cycleType: 'ONE_TIME',
    time: {
      hour: 20,
      minute: 0,
    },
  },
];
