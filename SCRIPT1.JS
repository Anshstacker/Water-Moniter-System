// AquaFlow Pro - Jal Drishti School Water Management System
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing Jal Drishti School Water Management System...');

    // ========================================================================
    // STATE MANAGEMENT - JAL DRISHTI EDITION
    // ========================================================================
    let appState = {
        loggedIn: false,
        currentPage: 'dashboard',
        schoolId: 'JAL-SCHOOL-001',
        schoolRole: null,
        anomalyActive: false,
        anomalyType: null,
        sentinelActive: true,
        stats: {
            dailyUsage: 1847,
            conservationScore: 92,
            activeMissions: 3,
            waterChampions: 48,
            fountainsStatus: '8/8 Active',
            washroomsStatus: 'Normal',
            cafeteriaUsage: '45 L/hr',
            irrigationStatus: 'Auto Mode'
        },
        // Student Leaderboard Data
        studentLeaderboard: [
            { id: 1, name: 'Aarav Sharma', class: '8A', points: 2450, waterSaved: 120, badge: 'gold', streak: 15 },
            { id: 2, name: 'Priya Singh', class: '7B', points: 2280, waterSaved: 105, badge: 'silver', streak: 12 },
            { id: 3, name: 'Rohan Mehta', class: '8C', points: 2050, waterSaved: 98, badge: 'bronze', streak: 10 },
            { id: 4, name: 'Sneha Gupta', class: '6A', points: 1890, waterSaved: 89, badge: 'none', streak: 8 },
            { id: 5, name: 'Kiran Kumar', class: '7A', points: 1750, waterSaved: 82, badge: 'none', streak: 7 },
            { id: 6, name: 'Ananya Das', class: '8B', points: 1680, waterSaved: 76, badge: 'none', streak: 6 },
            { id: 7, name: 'Vikram Rao', class: '6B', points: 1590, waterSaved: 71, badge: 'none', streak: 5 },
            { id: 8, name: 'Meera Joshi', class: '7C', points: 1420, waterSaved: 65, badge: 'none', streak: 4 }
        ],
        // Class Rankings
        classRankings: [
            { class: '8A', totalPoints: 8950, averageConservation: 94, students: 32 },
            { class: '7B', totalPoints: 8640, averageConservation: 91, students: 30 },
            { class: '8C', totalPoints: 8320, averageConservation: 89, students: 31 },
            { class: '6A', totalPoints: 7890, averageConservation: 87, students: 28 },
            { class: '7A', totalPoints: 7650, averageConservation: 85, students: 29 }
        ],
        // Water Conservation Missions
        activeMissions: [
            {
                id: 1,
                title: 'Zero Waste Week Challenge',
                description: 'Reduce daily water usage by 25% for one week',
                progress: 65,
                participants: 89,
                reward: 500,
                deadline: '2025-12-15',
                status: 'active'
            },
            {
                id: 2,
                title: 'Tap Guardian Initiative',
                description: 'Report and fix 5 leaking taps in school',
                progress: 80,
                participants: 45,
                reward: 300,
                deadline: '2025-12-10',
                status: 'active'
            },
            {
                id: 3,
                title: 'Water Quality Monitor',
                description: 'Test and document water quality daily for 2 weeks',
                progress: 40,
                participants: 25,
                reward: 400,
                deadline: '2025-12-20',
                status: 'active'
            }
        ],
        completedMissions: [
            {
                id: 4,
                title: 'Rainwater Harvesting Project',
                description: 'Install 3 rainwater collection systems',
                participants: 68,
                reward: 750,
                completedDate: '2025-11-28',
                status: 'completed'
            },
            {
                id: 5,
                title: 'Plant Care Challenge',
                description: 'Water school garden using only collected rainwater',
                participants: 52,
                reward: 250,
                completedDate: '2025-11-15',
                status: 'completed'
            }
        ],
        // School Activities with rich data
        schoolActivities: [
            {
                id: 1,
                action: 'Aarav Sharma completed "Zero Waste Week" mission',
                timestamp: '2 minutes ago',
                type: 'mission',
                points: 500,
                icon: 'trophy'
            },
            {
                id: 2,
                action: 'Class 8A achieved daily conservation target (25L saved)',
                timestamp: '15 minutes ago',
                type: 'conservation',
                points: 100,
                icon: 'leaf'
            },
            {
                id: 3,
                action: 'Water quality check completed - All parameters normal',
                timestamp: '45 minutes ago',
                type: 'quality',
                points: 0,
                icon: 'flask'
            },
            {
                id: 4,
                action: 'Priya Singh reported leaking tap in Block B (Fixed)',
                timestamp: '1 hour ago',
                type: 'maintenance',
                points: 150,
                icon: 'tools'
            },
            {
                id: 5,
                action: 'New mission launched: "Eco-Warrior Challenge"',
                timestamp: '2 hours ago',
                type: 'mission',
                points: 0,
                icon: 'flag'
            },
            {
                id: 6,
                action: 'Weekly water usage reduced by 18% from last week',
                timestamp: '3 hours ago',
                type: 'achievement',
                points: 0,
                icon: 'chart-line'
            }
        ],
        // Detection Results for Tap Sentinel
        detectionResults: [
            {
                location: 'Cafeteria Area',
                status: 'normal',
                message: 'All water points functioning normally',
                time: '2 min ago',
                confidence: 96
            },
            {
                location: 'Main Drinking Fountains',
                status: 'normal',
                message: '8 fountains active, optimal flow detected',
                time: '1 min ago',
                confidence: 98
            },
            {
                location: 'Washroom Block A',
                status: 'normal',
                message: 'No leaks detected, normal usage patterns',
                time: '30 sec ago',
                confidence: 94
            }
        ],
        // System Alerts Data
        systemAlerts: [
            {
                id: 1,
                type: 'usage_anomaly',
                severity: 'medium',
                title: 'Unusual Water Usage Detected',
                message: 'Abnormal water consumption detected in Washroom Block A during off-hours',
                location: 'Washroom Block A',
                time: '1 hour ago',
                status: 'active'
            },
            {
                id: 2,
                type: 'maintenance',
                severity: 'low',
                title: 'Scheduled Maintenance Reminder',
                message: 'Rainwater harvesting system maintenance due in 3 days',
                location: 'Backyard',
                time: '3 hours ago',
                status: 'active'
            }
        ]
    };

    // UI Elements
    let loginContainer, appContainer, loginForm;
    let liveClockEl, dailyUsageEl, conservationScoreEl, activeMissionsEl, waterChampionsEl;
    let studentLeaderboardEl, topChampionsEl, activeMissionsPreviewEl;
    let schoolActivityLogEl, detectionResultsEl;
    let mainFlowChart, monthlyTrendsChart, scadaChart;
    let supabase;

    // ========================================================================
    // SUPABASE INTEGRATION
    // ========================================================================
    function initializeSupabase() {
        try {
            if (window.supabase) {
                supabase = window.supabase.createClient(
                    'https://rzovrsbihiiyoyrdyylk.supabase.co',
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6b3Zyc2JpaGlpeW95cmR5eWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMTI3NTMsImV4cCI6MjA3MTg4ODc1M30.KVRH8s8wrP485eUTaVCYV_O7Xs7tkshizoDfZM8gNNE'
                );
                console.log('Supabase client initialized for Jal Drishti');
                return true;
            }
            return false;
        } catch (error) {
            console.warn('Supabase initialization failed:', error);
            return false;
        }
    }

    async function saveToSupabase(table, data) {
        if (!supabase) return false;
        try {
            const { error } = await supabase.from(table).insert([{
                school_id: appState.schoolId,
                ...data,
                timestamp: new Date().toISOString()
            }]);
            if (error) throw error;
            console.log(`Data saved to ${table} table`);
            return true;
        } catch (error) {
            console.error(`Failed to save to ${table}:`, error);
            return false;
        }
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================
    function initializeApp() {
        getUIElements();
        setupEventListeners();
        initializeSupabase();
        startLiveUpdates();
        console.log('Jal Drishti School System initialized successfully!');
    }

    function getUIElements() {
        loginContainer = document.getElementById('login-container');
        appContainer = document.getElementById('app-container');
        loginForm = document.getElementById('login-form');
        liveClockEl = document.getElementById('live-clock');

        // KPI elements
        dailyUsageEl = document.getElementById('daily-usage');
        conservationScoreEl = document.getElementById('conservation-score');
        activeMissionsEl = document.getElementById('active-missions');
        waterChampionsEl = document.getElementById('water-champions');

        // Dynamic content elements
        studentLeaderboardEl = document.getElementById('student-leaderboard');
        topChampionsEl = document.getElementById('top-champions');
        activeMissionsPreviewEl = document.getElementById('active-missions-preview');
        schoolActivityLogEl = document.getElementById('school-activity-log');
        detectionResultsEl = document.getElementById('detection-results');
    }

    function setupEventListeners() {
        // Login form
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', handleNavigation);
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

        // Chart controls
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', handleChartPeriodChange);
        });
    }

    // ========================================================================
    // AUTHENTICATION
    // ========================================================================
    function handleLogin(e) {
        e.preventDefault();
        
        const schoolRole = document.getElementById('school-role').value;
        const schoolId = document.getElementById('school-id').value;
        const password = document.getElementById('password').value;

        if (!schoolRole || !schoolId || !password) {
            alert('Please fill in all fields');
            return;
        }

        appState.schoolId = schoolId;
        appState.schoolRole = schoolRole;
        appState.loggedIn = true;

        transitionToDashboard();
    }

    function transitionToDashboard() {
        loginContainer.style.opacity = '0';
        
        setTimeout(() => {
            loginContainer.classList.add('hidden');
            appContainer.classList.remove('hidden');
            
            // Update user info
            document.getElementById('user-name').textContent = getUserName();
            document.getElementById('user-role').textContent = getRoleDisplayName();
            document.getElementById('school-display').textContent = appState.schoolId;
            
            setTimeout(() => {
                appContainer.style.opacity = '1';
                initializeDashboard();
                // Initialize the SCADA system only once after login
                initializeScadaSystem();
            }, 100);
        }, 500);
    }

    function getUserName() {
        const names = {
            'principal': 'Principal Sharma',
            'teacher': 'Ms. Priya Gupta',
            'student': 'Student Monitor',
            'maintenance': 'Mr. Rajesh Kumar',
            'admin': 'School Administrator'
        };
        return names[appState.schoolRole] || 'School User';
    }

    function getRoleDisplayName() {
        const roles = {
            'principal': 'School Principal',
            'teacher': 'Water Conservation Teacher',
            'student': 'Student Water Monitor',
            'maintenance': 'Maintenance Staff',
            'admin': 'School Administrator'
        };
        return roles[appState.schoolRole] || 'School User';
    }

    function handleLogout() {
        appState.loggedIn = false;
        window.location.reload();
    }

    // ========================================================================
    // NAVIGATION
    // ========================================================================
    function handleNavigation(e) {
        e.preventDefault();
        const targetPage = e.currentTarget.getAttribute('data-page');
        
        if (targetPage && targetPage !== appState.currentPage) {
            // Update nav active state
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page
            const targetPageEl = document.getElementById(targetPage);
            if (targetPageEl) {
                targetPageEl.classList.add('active');
                appState.currentPage = targetPage;
                
                // Initialize page-specific content
                initializePageContent(targetPage);
            }
        }
    }

    function initializePageContent(page) {
        switch (page) {
            case 'dashboard':
                initializeDashboard();
                break;
            case 'leaderboard':
                updateFullLeaderboard();
                updateClassRankings();
                break;
            case 'missions':
                updateCurrentMissions();
                updateCompletedMissions();
                break;
            case 'sentinel':
                updateTapSentinel();
                break;
            case 'alerts':
                updateSystemAlerts();
                break;
            case 'analytics':
                initializeAnalyticsCharts();
                break;
            case 'scada-control': // Refresh SCADA display on navigation
                updateAllScadaDisplays();
                break;
        }
    }

    // ========================================================================
    // DASHBOARD INITIALIZATION
    // ========================================================================
    function initializeDashboard() {
        updateKPIs();
        updateTopChampions();
        updateActiveMissionsPreview();
        updateSchoolActivityLog();
        updateDetectionResults();
        initializeCharts();
        
        // Save login activity
        saveToSupabase('user_sessions', {
            user_role: appState.schoolRole,
            login_time: new Date().toISOString()
        });

        console.log('Jal Drishti dashboard initialized successfully!');
    }

    function updateKPIs() {
        if (dailyUsageEl) dailyUsageEl.textContent = appState.stats.dailyUsage.toLocaleString() + ' L';
        if (conservationScoreEl) conservationScoreEl.textContent = appState.stats.conservationScore + '%';
        if (activeMissionsEl) activeMissionsEl.textContent = appState.stats.activeMissions;
        if (waterChampionsEl) waterChampionsEl.textContent = appState.stats.waterChampions;

        // Update status indicators
        const elements = {
            'fountains-status': appState.stats.fountainsStatus,
            'washrooms-status': appState.stats.washroomsStatus,
            'cafeteria-usage': appState.stats.cafeteriaUsage,
            'irrigation-status': appState.stats.irrigationStatus
        };

        Object.entries(elements).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
    }

    function updateTopChampions() {
        if (!topChampionsEl) return;

        const topThree = appState.studentLeaderboard.slice(0, 3);
        topChampionsEl.innerHTML = topThree.map((student, index) => {
            const badges = { gold: '👑', silver: '🥈', bronze: '🥉' };
            const badgeIcon = badges[student.badge] || '⭐';
            
            return `
                <div class="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg mb-3">
                    <div class="flex items-center">
                        <div class="text-2xl mr-3">${badgeIcon}</div>
                        <div>
                            <div class="font-semibold text-white">${student.name}</div>
                            <div class="text-sm text-slate-400">${student.class}</div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-green-400">${student.points}</div>
                        <div class="text-xs text-slate-400">${student.waterSaved}L saved</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function updateActiveMissionsPreview() {
        if (!activeMissionsPreviewEl) return;

        const previewMissions = appState.activeMissions.slice(0, 2);
        activeMissionsPreviewEl.innerHTML = previewMissions.map(mission => `
            <div class="mission-card">
                <div class="flex justify-between items-start mb-2">
                    <div class="font-semibold text-white">${mission.title}</div>
                    <div class="text-sm text-purple-400">${mission.reward} pts</div>
                </div>
                <div class="text-sm text-slate-400 mb-3">${mission.description}</div>
                <div class="flex justify-between items-center">
                    <div class="text-sm text-slate-500">${mission.participants} participants</div>
                    <div class="text-sm text-green-400">${mission.progress}% complete</div>
                </div>
                <div class="mission-progress">
                    <div class="mission-progress-fill" style="width: ${mission.progress}%"></div>
                </div>
            </div>
        `).join('');
    }

    function updateSchoolActivityLog() {
        if (!schoolActivityLogEl) return;

        const iconMap = {
            trophy: '🏆',
            leaf: '🌱',
            flask: '🧪',
            tools: '🔧',
            flag: '🚩',
            'chart-line': '📈'
        };

        schoolActivityLogEl.innerHTML = appState.schoolActivities.map(activity => `
            <div class="activity-item ${activity.type}">
                <div class="flex items-center">
                    <div class="text-xl mr-3">${iconMap[activity.icon] || '📋'}</div>
                    <div class="flex-1">
                        <div class="text-sm text-white">${activity.action}</div>
                        <div class="text-xs text-slate-400">${activity.timestamp}</div>
                    </div>
                    ${activity.points > 0 ? `<div class="text-sm text-green-400">+${activity.points} pts</div>` : ''}
                </div>
            </div>
        `).join('');
    }

    function updateDetectionResults() {
        if (!detectionResultsEl) return;

        detectionResultsEl.innerHTML = appState.detectionResults.map(result => {
            const statusColor = result.status === 'normal' ? 'text-green-400' : 'text-red-400';
            return `
                <div class="bg-slate-800/50 rounded-lg p-4 mb-3">
                    <div class="flex justify-between items-start mb-2">
                        <div class="font-medium text-white">${result.location}</div>
                        <div class="text-sm ${statusColor}">${result.confidence}%</div>
                    </div>
                    <div class="text-sm text-slate-400 mb-2">${result.message}</div>
                    <div class="text-xs text-slate-500">${result.time}</div>
                </div>
            `;
        }).join('');
    }

    // ========================================================================
    // CHARTS INITIALIZATION
    // ========================================================================
    function initializeCharts() {
        initializeMainFlowChart();
        setTimeout(() => {
            if (appState.currentPage === 'analytics') {
                initializeAnalyticsCharts();
            }
        }, 500);
    }

    function initializeMainFlowChart() {
        const canvas = document.getElementById('water-flow-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Generate realistic water usage data
        const now = new Date();
        const labels = [];
        const data = [];
        
        for (let i = 23; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            labels.push(time.getHours() + ':00');
            
            // Simulate school water usage patterns
            let usage = 20; // Base usage
            const hour = time.getHours();
            
            if (hour >= 7 && hour <= 18) { // School hours
                if (hour >= 8 && hour <= 10) usage = 180; // Morning peak
                else if (hour >= 12 && hour <= 14) usage = 150; // Lunch peak
                else if (hour >= 16 && hour <= 17) usage = 120; // Evening activities
                else usage = 80; // Regular school hours
            }
            
            // Add some randomness
            usage += Math.random() * 30 - 15;
            data.push(Math.max(usage, 10));
        }

        if (mainFlowChart) {
            mainFlowChart.destroy();
        }

        mainFlowChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Water Flow (L/min)',
                    data: data,
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0ea5e9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }

    function initializeAnalyticsCharts() {
        const canvas = document.getElementById('monthly-trends-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Generate monthly data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
        const usageData = [2100, 2050, 1950, 1800, 1750, 1900, 1850, 1847];
        const savingsData = [150, 200, 300, 450, 500, 350, 400, 353];

        if (monthlyTrendsChart) {
            monthlyTrendsChart.destroy();
        }

        monthlyTrendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Daily Usage (L)',
                    data: usageData,
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }, {
                    label: 'Water Saved (L)',
                    data: savingsData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#94a3b8'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }

    // ========================================================================
    // PAGE SPECIFIC UPDATES
    // ========================================================================
    function updateFullLeaderboard() {
        if (!studentLeaderboardEl) return;

        studentLeaderboardEl.innerHTML = appState.studentLeaderboard.map((student, index) => {
            const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
            const badgeClass = student.badge !== 'none' ? student.badge : 'default';
            const badgeIcon = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1);

            return `
                <div class="leaderboard-item ${rankClass}">
                    <div class="rank-badge ${badgeClass}">${badgeIcon}</div>
                    <div class="flex-1">
                        <div class="font-semibold text-white">${student.name}</div>
                        <div class="text-sm text-slate-400">${student.class} • ${student.streak} day streak</div>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-green-400">${student.points.toLocaleString()}</div>
                        <div class="text-sm text-slate-400">${student.waterSaved}L saved</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function updateClassRankings() {
        const classRankingsEl = document.getElementById('class-rankings');
        if (!classRankingsEl) return;

        classRankingsEl.innerHTML = appState.classRankings.map((classData, index) => `
            <div class="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg mb-3">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        ${index + 1}
                    </div>
                    <div>
                        <div class="font-semibold text-white">${classData.class}</div>
                        <div class="text-sm text-slate-400">${classData.students} students</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-green-400">${classData.totalPoints.toLocaleString()}</div>
                    <div class="text-sm text-slate-400">${classData.averageConservation}% avg</div>
                </div>
            </div>
        `).join('');
    }

    function updateCurrentMissions() {
        const currentMissionsEl = document.getElementById('current-missions');
        if (!currentMissionsEl) return;

        currentMissionsEl.innerHTML = appState.activeMissions.map(mission => `
            <div class="mission-card">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="font-semibold text-white text-lg mb-2">${mission.title}</div>
                        <div class="text-slate-400">${mission.description}</div>
                    </div>
                    <div class="text-purple-400 font-bold">${mission.reward} pts</div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="text-center">
                        <div class="text-white font-bold">${mission.progress}%</div>
                        <div class="text-xs text-slate-400">Progress</div>
                    </div>
                    <div class="text-center">
                        <div class="text-white font-bold">${mission.participants}</div>
                        <div class="text-xs text-slate-400">Participants</div>
                    </div>
                    <div class="text-center">
                        <div class="text-white font-bold">${mission.deadline}</div>
                        <div class="text-xs text-slate-400">Deadline</div>
                    </div>
                </div>
                <div class="mission-progress mb-4">
                    <div class="mission-progress-fill" style="width: ${mission.progress}%"></div>
                </div>
                <button class="btn btn-primary btn-sm w-full">Join Mission</button>
            </div>
        `).join('');
    }

    function updateCompletedMissions() {
        const completedMissionsEl = document.getElementById('completed-missions');
        if (!completedMissionsEl) return;

        completedMissionsEl.innerHTML = appState.completedMissions.map(mission => `
            <div class="mission-card completed">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="font-semibold text-white text-lg mb-2">${mission.title}</div>
                        <div class="text-slate-400">${mission.description}</div>
                    </div>
                    <div class="text-green-400 font-bold">✓ ${mission.reward} pts</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-sm text-slate-400">${mission.participants} participants</div>
                    <div class="text-sm text-green-400">Completed ${mission.completedDate}</div>
                </div>
            </div>
        `).join('');
    }

    function updateTapSentinel() {
        // Update camera feed status
        const feeds = ['cafeteria-feed', 'washroom-feed', 'fountain-feed'];
        feeds.forEach((feedId, index) => {
            const feedEl = document.getElementById(feedId);
            if (feedEl && index > 0) { // Keep first inactive as example
                feedEl.classList.add('active');
            }
        });
        
        updateDetectionResults();
    }

    function updateSystemAlerts() {
        const alertsListEl = document.getElementById('alerts-list');
        if (!alertsListEl) return;

        const severityColors = {
            low: 'text-green-400 border-green-400',
            medium: 'text-yellow-400 border-yellow-400',
            high: 'text-orange-400 border-orange-400',
            critical: 'text-red-400 border-red-400'
        };

        alertsListEl.innerHTML = appState.systemAlerts.map(alert => `
            <div class="bg-slate-800/50 border-l-4 ${severityColors[alert.severity]} rounded-lg p-4 mb-4">
                <div class="flex justify-between items-start mb-2">
                    <div class="font-semibold text-white">${alert.title}</div>
                    <div class="text-sm ${severityColors[alert.severity].split(' ')[0]} capitalize">${alert.severity}</div>
                </div>
                <div class="text-slate-400 mb-3">${alert.message}</div>
                <div class="flex justify-between items-center">
                    <div class="text-sm text-slate-500">${alert.location} • ${alert.time}</div>
                    <button class="btn btn-sm btn-primary">Resolve</button>
                </div>
            </div>
        `).join('');
    }

    // ========================================================================
    // REAL-TIME UPDATES
    // ========================================================================
    function startRealtimeSimulation() {
        // Update live metrics
        setInterval(() => {
            const flowEl = document.querySelector('[data-live="flow"]');
            const tempEl = document.querySelector('[data-live="temp"]');
            
            if (flowEl) {
                const baseFlow = 45.2;
                const newFlow = baseFlow + (Math.random() - 0.5) * 5;
                flowEl.textContent = newFlow.toFixed(1);
            }
            
            if (tempEl) {
                const baseTemp = 24.5;
                const newTemp = baseTemp + (Math.random() - 0.5) * 2;
                tempEl.textContent = newTemp.toFixed(1);
            }
        }, 5000);

        // Update activity log occasionally
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 30 seconds
                addNewActivity();
            }
        }, 30000);
    }

    function addNewActivity() {
        const newActivities = [
            { action: 'System performed automatic water quality check', type: 'quality', icon: 'flask', points: 0 },
            { action: 'Motion sensor detected water saving behavior', type: 'conservation', icon: 'leaf', points: 25 },
            { action: 'Scheduled irrigation system activated', type: 'maintenance', icon: 'tools', points: 0 },
            { action: 'New student joined conservation mission', type: 'mission', icon: 'flag', points: 0 }
        ];

        const newActivity = {
            id: Date.now(),
            ...newActivities[Math.floor(Math.random() * newActivities.length)],
            timestamp: 'Just now'
        };

        appState.schoolActivities.unshift(newActivity);
        appState.schoolActivities = appState.schoolActivities.slice(0, 6); // Keep only latest 6

        if (appState.currentPage === 'dashboard') {
            updateSchoolActivityLog();
        }
    }

    function startLiveUpdates() {
        // Update live clock
        function updateClock() {
            if (liveClockEl) {
                const now = new Date();
                liveClockEl.textContent = now.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            }
        }

        updateClock();
        setInterval(updateClock, 1000);

        startRealtimeSimulation();
    }

    // ========================================================================
    // CHART CONTROLS
    // ========================================================================
    function handleChartPeriodChange(e) {
        const period = e.target.getAttribute('data-period');
        
        // Update button states
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Update chart based on period
        if (mainFlowChart && appState.currentPage === 'dashboard') {
            updateChartForPeriod(period);
        }
    }

    function updateChartForPeriod(period) {
        let labels = [];
        let data = [];

        switch (period) {
            case 'day':
                // Hourly data for today
                for (let i = 23; i >= 0; i--) {
                    const time = new Date();
                    time.setHours(time.getHours() - i);
                    labels.push(time.getHours() + ':00');
                    data.push(Math.random() * 100 + 50);
                }
                break;
            case 'week':
                // Daily data for past week
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
                    data.push(Math.random() * 500 + 1000);
                }
                break;
            case 'month':
                // Weekly data for past month
                for (let i = 3; i >= 0; i--) {
                    labels.push(`Week ${4-i}`);
                    data.push(Math.random() * 2000 + 5000);
                }
                break;
        }

        mainFlowChart.data.labels = labels;
        mainFlowChart.data.datasets[0].data = data;
        mainFlowChart.update();
    }

    // ========================================================================
    // SCADA SYSTEM INTEGRATION
    // ========================================================================
    let scadaSystem = {
        connected: true,
        lastUpdate: new Date(),
        valves: {
            main: { position: 75, status: 'open' },
            blockA: { position: 80, status: 'open' },
            blockB: { position: 70, status: 'open' }
        },
        pumps: {
            main: { running: true, current: 15.2, speed: 1450 },
            booster: { running: false, current: 0, speed: 0 }
        },
        tanks: {
            overhead1: { level: 78, capacity: 5000 },
            overhead2: { level: 65, capacity: 3000 },
            ground: { level: 85, capacity: 10000 }
        },
        pressures: {
            inlet: 2.8,
            distribution: 2.2,
            outlet: 1.8
        },
        flowRates: {
            main: 145,
            blockA: 45,
            blockB: 38
        }
    };

    function initializeScadaSystem() {
        setupScadaControls();
        startScadaRealTimeUpdates();
        initializeScadaChart();
        console.log('✅ SCADA System initialized');
    }

    function setupScadaControls() {
        document.getElementById('main-valve-open')?.addEventListener('click', () => controlValve('main', 'open'));
        document.getElementById('main-valve-close')?.addEventListener('click', () => controlValve('main', 'close'));
        document.getElementById('blocka-valve-open')?.addEventListener('click', () => controlValve('blockA', 'open'));
        document.getElementById('blocka-valve-close')?.addEventListener('click', () => controlValve('blockA', 'close'));
        document.getElementById('blockb-valve-open')?.addEventListener('click', () => controlValve('blockB', 'open'));
        document.getElementById('blockb-valve-close')?.addEventListener('click', () => controlValve('blockB', 'close'));
        document.getElementById('main-pump-start')?.addEventListener('click', () => controlMotor('main', 'start'));
        document.getElementById('main-pump-stop')?.addEventListener('click', () => controlMotor('main', 'stop'));
        document.getElementById('booster-pump-start')?.addEventListener('click', () => controlMotor('booster', 'start'));
        document.getElementById('booster-pump-stop')?.addEventListener('click', () => controlMotor('booster', 'stop'));
        document.getElementById('emergency-stop')?.addEventListener('click', emergencyStopAll);
        document.getElementById('emergency-valve-close')?.addEventListener('click', emergencyCloseAllValves);
        document.getElementById('system-reset')?.addEventListener('click', systemReset);
        document.getElementById('clear-scada-log')?.addEventListener('click', clearScadaLog);
    }

    async function controlValve(valve, action) {
        const newPosition = action === 'open' ? Math.min(100, scadaSystem.valves[valve].position + 25) : Math.max(0, scadaSystem.valves[valve].position - 25);
        scadaSystem.valves[valve].position = newPosition;
        scadaSystem.valves[valve].status = newPosition > 0 ? 'open' : 'closed';
        updateValveDisplay(valve);
        logScadaEvent(`Valve ${valve} ${action} command - New Position: ${newPosition}%`, 'info');
        await saveToSupabase('scada_actions', { action_type: 'valve_control', device: valve, command: action, new_value: newPosition, user_role: appState.schoolRole });
    }

    async function controlMotor(motor, action) {
        const isRunning = action === 'start';
        scadaSystem.pumps[motor].running = isRunning;
        scadaSystem.pumps[motor].current = isRunning ? (motor === 'main' ? 15.2 : 12.8) : 0;
        scadaSystem.pumps[motor].speed = isRunning ? (motor === 'main' ? 1450 : 1200) : 0;
        updateMotorDisplay(motor);
        logScadaEvent(`Motor ${motor} ${action} command`, isRunning ? 'info' : 'warning');
        await saveToSupabase('scada_actions', { action_type: 'motor_control', device: motor, command: action, new_status: isRunning, user_role: appState.schoolRole });
    }

    async function emergencyStopAll() {
        if (confirm('⚠️ EMERGENCY STOP ALL SYSTEMS?\nThis will stop all motors and close all valves immediately!')) {
            Object.keys(scadaSystem.pumps).forEach(motor => {
                scadaSystem.pumps[motor] = { running: false, current: 0, speed: 0 };
                updateMotorDisplay(motor);
            });
            Object.keys(scadaSystem.valves).forEach(valve => {
                scadaSystem.valves[valve] = { position: 0, status: 'closed' };
                updateValveDisplay(valve);
            });
            Object.keys(scadaSystem.flowRates).forEach(flow => scadaSystem.flowRates[flow] = 0);
            logScadaEvent('🚨 EMERGENCY STOP ACTIVATED - All systems halted', 'error');
            await saveToSupabase('scada_actions', { action_type: 'emergency_stop', device: 'all_systems', command: 'emergency_stop', user_role: appState.schoolRole, emergency: true });
            alert('🚨 EMERGENCY STOP ACTIVATED\nAll systems have been stopped safely.');
        }
    }

    async function emergencyCloseAllValves() {
        if (confirm('⚠️ CLOSE ALL VALVES?\nThis will stop water flow to all areas.')) {
            Object.keys(scadaSystem.valves).forEach(valve => {
                scadaSystem.valves[valve] = { position: 0, status: 'closed' };
                updateValveDisplay(valve);
            });
            Object.keys(scadaSystem.flowRates).forEach(flow => scadaSystem.flowRates[flow] = 0);
            logScadaEvent('🚨 Emergency valve closure initiated', 'error');
            await saveToSupabase('scada_actions', { action_type: 'emergency_valve_close', device: 'all_valves', command: 'close_all', user_role: appState.schoolRole, emergency: true });
        }
    }

    async function systemReset() {
        if (confirm('🔄 RESET SYSTEM?\nThis will restore default operational parameters.')) {
            scadaSystem.valves = { main: { position: 75, status: 'open' }, blockA: { position: 80, status: 'open' }, blockB: { position: 70, status: 'open' } };
            scadaSystem.pumps = { main: { running: true, current: 15.2, speed: 1450 }, booster: { running: false, current: 0, speed: 0 } };
            scadaSystem.flowRates = { main: 145, blockA: 45, blockB: 38 };
            updateAllScadaDisplays();
            logScadaEvent('🔄 System reset to default parameters', 'info');
            await saveToSupabase('scada_actions', { action_type: 'system_reset', device: 'all_systems', command: 'reset', user_role: appState.schoolRole });
            alert('🔄 System Reset Complete\nAll systems restored to default parameters.');
        }
    }

    function updateValveDisplay(valve) {
        const idPrefix = valve === 'blockA' ? 'blocka' : valve === 'blockB' ? 'blockb' : valve;
        const positionEl = document.getElementById(`${idPrefix}-valve-position`);
        const flowEl = document.getElementById(`${idPrefix}-flow-rate`);
        if (positionEl) positionEl.textContent = `${scadaSystem.valves[valve].position}%`;
        if (flowEl) {
             const flowRateKey = valve === 'main' ? 'main' : valve;
             const flow = scadaSystem.flowRates[flowRateKey]
            flowEl.parentElement.innerHTML = `Flow: <span id="${idPrefix}-flow-rate">${flow} L/min</span>`;
        }
    }

    function updateMotorDisplay(motor) {
        const statusEl = document.getElementById(`${motor}-pump-status`);
        const currentEl = document.getElementById(`${motor}-pump-current`);
        const speedEl = document.getElementById(`${motor}-pump-speed`);
        if (statusEl) {
            statusEl.textContent = scadaSystem.pumps[motor].running ? 'RUNNING' : 'STOPPED';
            statusEl.className = `motor-status ${scadaSystem.pumps[motor].running ? 'running' : 'stopped'}`;
        }
        if (currentEl) currentEl.textContent = `${scadaSystem.pumps[motor].current.toFixed(1)}A`;
        if (speedEl) speedEl.textContent = `${scadaSystem.pumps[motor].speed} RPM`;
    }

    function updateAllScadaDisplays() {
        Object.keys(scadaSystem.valves).forEach(updateValveDisplay);
        Object.keys(scadaSystem.pumps).forEach(updateMotorDisplay);
        updateTankLevels();
        updatePressureGauges();
    }

    function updateTankLevels() {
        Object.entries(scadaSystem.tanks).forEach(([tank, data]) => {
            const idPrefix = tank === 'overhead1' ? 'tank1' : tank === 'overhead2' ? 'tank2' : 'ground-tank';
            const textEl = document.getElementById(`${idPrefix}-level-text`);
            if (textEl) textEl.textContent = `${Math.round(data.level)}%`;
        });
    }

    function updatePressureGauges() {
        Object.entries(scadaSystem.pressures).forEach(([type, value]) => {
            const valueEl = document.getElementById(`${type}-pressure-value`);
            if (valueEl) valueEl.innerHTML = `${value.toFixed(1)} <span class="text-sm">Bar</span>`;
        });
    }

    function logScadaEvent(message, type = 'info') {
        const logContainer = document.getElementById('scada-system-log');
        if (!logContainer) return;
        const logItem = document.createElement('div');
        const typeClass = { info: 'text-slate-300', warning: 'text-yellow-400', error: 'text-red-400' };
        logItem.className = `scada-log-item info flex ${typeClass[type] || 'text-slate-300'}`;
        logItem.innerHTML = `<span class="log-timestamp text-slate-500 mr-4">${new Date().toLocaleTimeString()}</span><span class="log-message">${message}</span>`;
        logContainer.insertBefore(logItem, logContainer.firstChild);
        while (logContainer.children.length > 20) logContainer.removeChild(logContainer.lastChild);
    }

    function clearScadaLog() {
        const logContainer = document.getElementById('scada-system-log');
        if (logContainer) {
            logContainer.innerHTML = '';
            logScadaEvent('System log cleared by user', 'info');
        }
    }

    function startScadaRealTimeUpdates() {
        setInterval(() => {
            updateScadaConnectionStatus();
            simulateScadaDataVariations();
            updateAllScadaDisplays();
        }, 2000);
        setInterval(() => {
            const lastUpdateEl = document.getElementById('scada-last-update');
            if (lastUpdateEl) lastUpdateEl.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }

    function updateScadaConnectionStatus() {
        const statusEl = document.getElementById('scada-connection-status');
        const textEl = document.getElementById('scada-connection-text');
        const isConnected = Math.random() > 0.05; // 95% chance of being connected
        scadaSystem.connected = isConnected;
        if (statusEl) statusEl.className = `scada-status-indicator ${isConnected ? 'online' : 'offline'}`;
        if (textEl) {
            textEl.textContent = isConnected ? 'ONLINE' : 'OFFLINE';
            textEl.className = isConnected ? 'text-green-400' : 'text-red-400';
        }
    }

    function simulateScadaDataVariations() {
        if (!scadaSystem.connected) return;
        // Simulate pressure variations
        scadaSystem.pressures.inlet = Math.max(2.0, Math.min(3.5, scadaSystem.pressures.inlet + (Math.random() - 0.5) * 0.1));
        scadaSystem.pressures.distribution = Math.max(1.5, Math.min(2.8, scadaSystem.pressures.distribution + (Math.random() - 0.5) * 0.08));
        scadaSystem.pressures.outlet = Math.max(1.0, Math.min(2.2, scadaSystem.pressures.outlet + (Math.random() - 0.5) * 0.06));
        // Simulate tank level changes
        if (scadaSystem.pumps.main.running) {
            Object.values(scadaSystem.tanks).forEach(tank => tank.level = Math.max(10, Math.min(95, tank.level + (Math.random() - 0.4) * 0.5)));
        } else {
             Object.values(scadaSystem.tanks).forEach(tank => tank.level = Math.max(10, Math.min(95, tank.level - (Math.random()) * 0.2)));
        }
        // Simulate flow rates
        Object.keys(scadaSystem.flowRates).forEach(flow => {
            const valve = flow === 'main' ? 'main' : (flow === 'blockA' ? 'blockA' : 'blockB');
            const baseFlow = flow === 'main' ? 150 : 50;
            scadaSystem.flowRates[flow] = Math.round(baseFlow * (scadaSystem.valves[valve].position / 100) * (scadaSystem.pumps.main.running ? 1 : 0.1) * (0.9 + Math.random() * 0.2));
        });

        // Update SCADA chart data
        if (scadaChart && appState.currentPage === 'scada-control') {
            scadaChart.data.labels.push(new Date().toLocaleTimeString());
            scadaChart.data.datasets[0].data.push(scadaSystem.flowRates.main);
            scadaChart.data.datasets[1].data.push(scadaSystem.pressures.inlet.toFixed(2));
            if (scadaChart.data.labels.length > 20) {
                scadaChart.data.labels.shift();
                scadaChart.data.datasets.forEach(dataset => dataset.data.shift());
            }
            scadaChart.update('none');
        }
    }

    function initializeScadaChart() {
        const canvas = document.getElementById('scada-realtime-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (scadaChart) scadaChart.destroy();
        scadaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Main Flow (L/min)', data: [], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', yAxisID: 'y', tension: 0.3, fill: true, pointRadius: 2 },
                    { label: 'Inlet Pressure (Bar)', data: [], borderColor: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.1)', yAxisID: 'y1', tension: 0.3, fill: true, pointRadius: 2 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                    y: { type: 'linear', display: true, position: 'left', beginAtZero: true, suggestedMax: 200, ticks: { color: '#38bdf8' }, grid: { color: 'rgba(148, 163, 184, 0.1)' }, title: { display: true, text: 'Flow Rate', color: '#38bdf8'} },
                    y1: { type: 'linear', display: true, position: 'right', beginAtZero: true, max: 4, ticks: { color: '#4ade80' }, grid: { drawOnChartArea: false }, title: { display: true, text: 'Pressure', color: '#4ade80'} }
                },
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                interaction: { intersect: false, mode: 'index' }
            }
        });
    }

    // Start the application
    initializeApp();
});