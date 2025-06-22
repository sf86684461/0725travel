// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initSmoothScroll();
    initFormValidation();
    initMobileMenu();
});

/**
 * 平滑滚动功能
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 表单验证功能
 */
function initFormValidation() {
    const form = document.querySelector('.booking-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 简单验证
            if (validateForm(data)) {
                // 这里可以添加实际的表单提交逻辑
                showMessage('预订请求已提交，我们将尽快与您联系！', 'success');
                this.reset();
            }
        });
    }
}

/**
 * 表单验证函数
 */
function validateForm(data) {
    const { name, email, phone, date } = data;
    
    if (!name.trim()) {
        showMessage('请输入您的姓名', 'error');
        return false;
    }
    
    if (!email.trim() || !isValidEmail(email)) {
        showMessage('请输入有效的电子邮箱', 'error');
        return false;
    }
    
    if (!phone.trim()) {
        showMessage('请输入您的联系电话', 'error');
        return false;
    }
    
    if (!date) {
        showMessage('请选择出发日期', 'error');
        return false;
    }
    
    return true;
}

/**
 * 邮箱格式验证
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 显示消息提示
 */
function showMessage(message, type = 'info') {
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // 添加样式
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        backgroundColor: type === 'success' ? '#1a936f' : '#e74c3c',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // 添加到页面
    document.body.appendChild(messageEl);
    
    // 显示动画
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

/**
 * 移动端菜单功能
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // 点击链接后关闭菜单
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                this.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
}