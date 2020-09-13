import fetch from './fetch'

const WX_LOGIN = (date, header) =>
  fetch.main('api_v1/wechat/auth/login', 'POST', date, header)

const GET_USERINFO = (date) => fetch.post('api_v1/wechat/auth/info', date)

const GET_MOBILE = (date) => fetch.post('api_v1/wechat/auth/phone', date)

const SET_LOCATION = (date) => fetch.get('api_v1/edu/index/district', date)

const GET_VENUE_LIST = (date) => fetch.get('api_v1/edu/venue/list', date)

// HOME

const GET_INDEX_COURSES_LIST = (date) =>
  fetch.get('api_v1/edu/index/courses', date)

const GET_INDEX_DASH = () => fetch.get('api_v1/edu/index/dash')

// COURSES

const GET_COURSES_LIST = (data) => fetch.get('api_v1/edu/course/list', data)

const GET_COURSES_DETAIL = (id, data) =>
  fetch.get(`api_v1/edu/course/info/${id}`, data)

const GET_COURSES_SCHEDULE = (data) =>
  fetch.get('api_v1/edu/courseschedule/list', data)

const GET_RECOMMEND_BY_COURSE = (data) =>
  fetch.get('api_v1/edu/course/relate', data)

const GET_TEACHER_BY_COURSE = (id) => fetch.get(`api_v1/edu/coach/info/${id}`)
// ACTION

const GET_ACTION_LIST = (data) => fetch.get('api_v1/edu/hot/list', data)

const GET_ACTION_DETAIL = (id) => fetch.get(`api_v1/edu/hot/info/${id}`)

// MINE

const GET_USERINFO_BY_MINE = () => fetch.get('api_v1/edu/profile/dash')

const SWITCH_STUDENT = (id) => fetch.get(`api_v1/edu/profile/switch/${id}`)

const UPLOAD_IMG = (filePath, data) =>
  fetch.upload(`api_v1/edu/profile/upload`, filePath, data)

// TEACHER

const GET_TEACHER_LIST = (data) => fetch.get('api_v1/edu/coach/list', data)

const GET_TEACHER_DETAIL = (id) => fetch.get(`api_v1/edu/coach/info/${id}`)

const GET_RECOMMEND_BY_TEACHER = (data) =>
  fetch.get(`api_v1/edu/coach/courses`, data)

// VATCTION&ADJUST

const GET_CLASS_INFO = (id) => fetch.get(`api_v1/edu/classset/info/${id}`)

const GET_COURSES_RECORD = (id) =>
  fetch.get(`api_v1/edu/classrecord/list/${id}`)

const GET_CLASS_BY_STUDENT = (data) =>
  fetch.get('api_v1/edu/profile/classset', data)

const GET_CLASS_DETAIL = (id) =>
  fetch.get(`api_v1/edu/classstudent/info/${id}`)

const GET_RECORD_BY_CLASS = (data) =>
  fetch.get('api_v1/edu/classrecord/list', data)

const GET_SCHEDULE_BY_CLASS = (data) =>
  fetch.get('api_v1/edu/classschedule/list', data)

// const GET_SCHEDULE_BY_CLASS = (id) =>
//   fetch.get(`api_v1/edu/profile/courseticket`)

const SAVE_APPOINTMENT = (data) =>
  fetch.post(`api_v1/edu/appointment/save`, data)

const GET_OLD_SCHEDULE_BY_CLASS = (data) =>
  fetch.get(`api_v1/edu/profile/courseticket`, data)

const GET_NEW_SCHEDULE_BY_CLASS = (id, data) =>
  fetch.get(`api_v1/edu/profile/courseticket/${id}`, data)

// _RECORD

const GET_ADJUST_RECORD_LIST = (data) =>
  fetch.get('api_v1/edu/appointment/list', data)

const GET_RECORD_LIST = (data) =>
  fetch.get('api_v1/edu/classrecord/list', data)

// const GET_COURSE_RECORD_LIST = (data) =>
//   fetch.get('api_v1/edu/coachrecord/list', data)

// const GET_COURSE_RECORD_DETAIL = (id) =>
//   fetch.get(`api_v1/edu/coachrecord/info/${id}`)

// const GET_ADJUST_RECORD_DETAIL = (id) => fetch.get(`api_v1/edu/appointment/info/${id}`)

// BOOK

const BOOK_COURSES = (data) => fetch.post('api_v1/edu/audition/save', data)

const GET_SMS = (data) => fetch.post('api_v1/edu/index/sms/send', data)

// MANANGER

const GET_ADJUST_MANAGER_LIST = (data) =>
  fetch.get('api_v1/edu/profile/coach/appointments', data)

const GET_COURSE_MANAGER_LIST = (data) =>
  fetch.get('api_v1/edu/profile/coach/audition', data)

const GET_CLASS_MANAGER_LIST = (data) =>
  fetch.get('api_v1/edu/profile/coach/classset', data)

const GET_STUDENT_MANAGER_LIST_BY_CLASS = (id, data) =>
  fetch.get(`api_v1/edu/profile/coach/classset/${id}/students`, data)

export default {
  WX_LOGIN,
  GET_USERINFO,
  GET_MOBILE,
  SET_LOCATION,
  GET_INDEX_COURSES_LIST,
  GET_INDEX_DASH,
  GET_COURSES_LIST,
  GET_COURSES_DETAIL,
  GET_COURSES_SCHEDULE,
  GET_RECOMMEND_BY_COURSE,
  GET_TEACHER_BY_COURSE,
  GET_ACTION_LIST,
  GET_ACTION_DETAIL,
  GET_TEACHER_LIST,
  GET_TEACHER_DETAIL,
  GET_RECOMMEND_BY_TEACHER,
  BOOK_COURSES,
  GET_SMS,
  GET_USERINFO_BY_MINE,
  SWITCH_STUDENT,
  GET_CLASS_BY_STUDENT,
  GET_CLASS_DETAIL,
  GET_RECORD_BY_CLASS,
  GET_SCHEDULE_BY_CLASS,
  SAVE_APPOINTMENT,
  GET_ADJUST_RECORD_LIST,
  GET_OLD_SCHEDULE_BY_CLASS,
  GET_NEW_SCHEDULE_BY_CLASS,
  GET_RECORD_LIST,
  GET_COURSES_RECORD,
  GET_CLASS_INFO,
  GET_ADJUST_MANAGER_LIST,
  GET_COURSE_MANAGER_LIST,
  GET_CLASS_MANAGER_LIST,
  GET_STUDENT_MANAGER_LIST_BY_CLASS,
  UPLOAD_IMG,
  GET_VENUE_LIST
}
