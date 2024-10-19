// Sample data fetching from a hypothetical API
const fetchCourses = async () => {
    try {
        const response = await fetch('/api/courses');
        const courses = await response.json();
        return courses;
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
};

const fetchTeachers = async () => {
    try {
        const response = await fetch('/api/teachers');
        const teachers = await response.json();
        return teachers;
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
};

// Populate courses and teachers in the UI
const populateCourses = async () => {
    const courses = await fetchCourses();
    const courseList = document.getElementById('course-list');

    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `<h3>${course.name}</h3><p>${course.type}</p>`;
        courseList.appendChild(courseItem);
    });
};

const populateTeachers = async () => {
    const teachers = await fetchTeachers();
    const teacherList = document.getElementById('teacher-list');
    const teacherSelect = document.getElementById('teacher');

    teachers.forEach(teacher => {
        const teacherItem = document.createElement('div');
        teacherItem.className = 'teacher-profile';
        teacherItem.innerHTML = `<h3>${teacher.name}</h3><p>Rating: ${teacher.rating}</p>`;
        teacherList.appendChild(teacherItem);

        const option = document.createElement('option');
        option.value = teacher.id;
        option.textContent = teacher.name;
        teacherSelect.appendChild(option);
    });
};

// Handle feedback submission
const handleFeedbackSubmission = async (event) => {
    event.preventDefault();
    
    const teacherId = document.getElementById('teacher').value;
    const feedback = document.getElementById('feedback').value;

    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teacherId, feedback }),
        });

        if (response.ok) {
            alert('Feedback submitted successfully!');
            document.getElementById('feedback-form').reset(); // Clear form after submission
        } else {
            alert('Error submitting feedback. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateCourses();
    populateTeachers();
    document.getElementById('feedback-form').addEventListener('submit', handleFeedbackSubmission);
});
