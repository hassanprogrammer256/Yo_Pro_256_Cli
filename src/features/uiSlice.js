// store/slices/uiSlice.js (updated)
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    // Student
    studentActiveTab: 'dashboard',
    showPaymentModal: false,
    selectedTier: 'gold',
    selectedCourse: null,
    // Admin
    adminActiveTab: 'dashboard',
    showAnnouncementModal: false,
    announcementData: {
      type: 'broadcast',
      recipients: 'all',
      title: '',
      message: '',
      priority: 'normal'
    },
    // Instructor
    instructorActiveTab: 'dashboard',
    showScheduleModal: false,
    scheduleData: {
      course: '',
      title: '',
      date: '',
      time: '',
      duration: '',
      meetLink: '',
      description: ''
    },
    // Common
    selectedUserId: null,
  },
  reducers: {
    // Student
    setStudentActiveTab: (state, action) => {
      state.studentActiveTab = action.payload
    },
    togglePaymentModal: (state, action) => {
      state.showPaymentModal = action.payload ?? !state.showPaymentModal
    },
    setSelectedTier: (state, action) => {
      state.selectedTier = action.payload
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload
    },
    
    // Admin
    setAdminActiveTab: (state, action) => {
      state.adminActiveTab = action.payload
    },
    toggleAnnouncementModal: (state, action) => {
      state.showAnnouncementModal = action.payload ?? !state.showAnnouncementModal
    },
    updateAnnouncementData: (state, action) => {
      state.announcementData = { ...state.announcementData, ...action.payload }
    },
    resetAnnouncementData: (state) => {
      state.announcementData = {
        type: 'broadcast',
        recipients: 'all',
        title: '',
        message: '',
        priority: 'normal'
      }
    },
    
    // Instructor
    setInstructorActiveTab: (state, action) => {
      state.instructorActiveTab = action.payload
    },
    toggleScheduleModal: (state, action) => {
      state.showScheduleModal = action.payload ?? !state.showScheduleModal
    },
    updateScheduleData: (state, action) => {
      state.scheduleData = { ...state.scheduleData, ...action.payload }
    },
    resetScheduleData: (state) => {
      state.scheduleData = {
        course: '',
        title: '',
        date: '',
        time: '',
        duration: '',
        meetLink: '',
        description: ''
      }
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload
    },
  },
})

export const {
  // Student
  setStudentActiveTab,
  togglePaymentModal,
  setSelectedTier,
  setSelectedCourse,
  // Admin
  setAdminActiveTab,
  toggleAnnouncementModal,
  updateAnnouncementData,
  resetAnnouncementData,
  // Instructor
  setInstructorActiveTab,
  toggleScheduleModal,
  updateScheduleData,
  resetScheduleData,
  setSelectedUserId,
} = uiSlice.actions

export default uiSlice.reducer