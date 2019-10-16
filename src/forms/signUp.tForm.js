import {COURSES, FORM_ELEMENT} from '../constants/formFields.constant';
import {get} from '../helpers/function.helper';
// eslint-disable-next-line import/named
import {allCoursesOption} from '../constants/allOfferedCourses';
import {getCourse} from '../helpers/courses';

export const basicSignUpTForm = () => [
  {
    label: 'Name',
    name: 'name',
    kwargs: {
      placeholder: 'ex: Faisal Manzer',
    },
    type: FORM_ELEMENT.INPUT,
    rules: [{required: true}],
  },
  {
    label: 'Roll number',
    name: 'roll',
    kwargs: {
      placeholder: 'ex: 17BCE064',
    },
    type: FORM_ELEMENT.INPUT,
    rules: [
      {required: true},
      {
        pattern: /(20)?\d{2}\w+\d{3}/,
        message: 'Roll number is not in valid pattern. ',
      },
    ],
  },
  {
    label: 'Student ID',
    name: 'student_id',
    kwargs: {
      placeholder: 'ex: 20177089',
    },
    type: FORM_ELEMENT.INPUT,
    rules: [
      {required: true},
      {
        pattern: /^\d{8,9}$/,
        message: 'Not valid Student ID, normally Student ID is of 8 or 9 digit',
      },
    ],
  },
  {
  },
  {
    label: 'Year',
    name: 'year',
    type: FORM_ELEMENT.SELECT,
    rules: [{required: true}],
    options: {
      '1': '1st year',
      '2': '2nd year',
      '3': '3rd year',
      '4': '4th year',
      '5': '5th year',
    },
    kwargs: {
      placeholder: '2nd year',
    },
  },
  {
    label: 'Number',
    name: 'phone_number',
    type: FORM_ELEMENT.INPUT,
    rules: [{required: true}, {pattern: /^\d{10}$/, message: 'Not a Valid Indian Phone Number'}],
    kwargs: {
      addonBefore: '+91',
    },
  },
];