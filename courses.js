// 课程相关脚本 - 包含学生ID后三位678

document.addEventListener('DOMContentLoaded', function() {
    // 加载课程数据
    loadCourses678();
});

// 加载课程数据并显示 - 包含学生ID后三位678
function loadCourses678() {
    // 从JSON文件加载课程数据（替换原硬编码数据）
    fetch('courses.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load courses');
            }
            return response.json();
        })
        .then(courses => {
            // 处理JSON中字段名差异（统一为sampleProjects数组）
            const normalizedCourses = courses.map(course => ({
                ...course,
                // 原JSON中部分数据是sampleProject（单数），转换为数组保持兼容
                sampleProjects: course.sampleProjects 
                    ? Array.isArray(course.sampleProjects) 
                        ? course.sampleProjects 
                        : [course.sampleProjects]  // 字符串转数组
                    : [course.sampleProject]  // 处理字段名单数情况
            }));
            
            // 显示课程
            displayCourses678(normalizedCourses);
            
            // 在首页显示部分课程
            if (document.getElementById('featured-courses-container')) {
                const featuredCourses = normalizedCourses.slice(0, 3);
                displayFeaturedCourses678(featuredCourses);
            }
        })
        .catch(error => {
            console.error('Error loading courses:', error);
        });
}

// 显示课程列表 - 保持不变（确保与原逻辑兼容）
function displayCourses678(courses) {
    const container = document.getElementById('courses-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image || 'https://picsum.photos/600/400?random=10'}" alt="${course.title}">
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-full-details">
                    <h4>Course Details</h4>
                    <p><i class="fas fa-clock"></i> Duration: ${course.duration}</p>
                    <h4>Assessment Requirements</h4>
                    <p>${course.assessment}</p>
                    <h4>Sample Projects</h4>
                    <ul>
                        ${course.sampleProjects.map(project => `<li>${project}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        container.appendChild(courseCard);
    });
}

// 显示特色课程 - 保持不变
function displayFeaturedCourses678(courses) {
    const container = document.getElementById('featured-courses-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image || 'https://picsum.photos/600/400?random=10'}" alt="${course.title}">
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-details">
                    <p><i class="fas fa-clock"></i> Duration: ${course.duration}</p>
                    <p><i class="fas fa-check-circle"></i> ${course.assessment.split(',')[0]}</p>
                </div>
            </div>
        `;
        
        container.appendChild(courseCard);
    });
}