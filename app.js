const { useState, useEffect } = React;
const { Plus, Trash2, CheckSquare, Square, ListTodo } = lucide;

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Storage key for tasks
    const STORAGE_KEY = 'todolist_tasks_v1';

    // Storage utilities - multiple fallback methods
    const saveToStorage = (taskList) => {
        try {
            // Method 1: Try localStorage first
            if (typeof Storage !== 'undefined' && window.localStorage) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
                return;
            }
        } catch (e) {
            console.log('localStorage not available');
        }
        
        try {
            // Method 2: Try sessionStorage
            if (typeof Storage !== 'undefined' && window.sessionStorage) {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
                return;
            }
        } catch (e) {
            console.log('sessionStorage not available');
        }
        
        // Method 3: Use window object as fallback
        window.todoAppTasks = taskList;
        
        // Method 4: Use document cookies as additional fallback
        try {
            document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(taskList))}; path=/; max-age=31536000`;
        } catch (e) {
            console.log('Cookies not available');
        }
    };

    const loadFromStorage = () => {
        try {
            // Method 1: Try localStorage first
            if (typeof Storage !== 'undefined' && window.localStorage) {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) return JSON.parse(saved);
            }
        } catch (e) {
            console.log('localStorage read failed');
        }
        
        try {
            // Method 2: Try sessionStorage
            if (typeof Storage !== 'undefined' && window.sessionStorage) {
                const saved = sessionStorage.getItem(STORAGE_KEY);
                if (saved) return JSON.parse(saved);
            }
        } catch (e) {
            console.log('sessionStorage read failed');
        }
        
        // Method 3: Try window object
        if (window.todoAppTasks) {
            return window.todoAppTasks;
        }
        
        // Method 4: Try cookies
        try {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === STORAGE_KEY) {
                    return JSON.parse(decodeURIComponent(value));
                }
            }
        } catch (e) {
            console.log('Cookie read failed');
        }
        
        return [];
    };

    // Load tasks from storage on component mount
    useEffect(() => {
        const savedTasks = loadFromStorage();
        setTasks(savedTasks);
    }, []);

    // Save tasks to storage whenever tasks change
    useEffect(() => {
        // Save even empty arrays to ensure deletion is persisted
        saveToStorage(tasks);
    }, [tasks]);

    // Convert to Pascal Case
    const toPascalCase = (str) => {
        return str.replace(/\w+/g, (word) => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
    };

    // Add new task
    const addTask = async () => {
        if (!newTask.trim()) return;
        
        setIsLoading(true);
        
        try {
            const task = {
                id: Date.now(),
                title: toPascalCase(newTask),
                description: '',
                completed: false,
                createdAt: new Date().toISOString(),
                isEditing: false
            };
            
            setTasks(prev => [...prev, task]);
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle task completion
    const toggleTask = (id) => {
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Delete task
    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    // Edit description
    const editDescription = (id, newDescription) => {
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, description: newDescription, isEditing: false } : task
        ));
    };

    // Toggle editing mode
    const toggleEdit = (id) => {
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, isEditing: !task.isEditing } : task
        ));
    };

    // Format date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        
        return `${day}${daySuffix(day)} ${month} ${year} at ${displayHours}:${displayMinutes} ${ampm}`;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-3 sm:p-6" },
        React.createElement('div', { className: "max-w-4xl mx-auto" },
            React.createElement('div', { className: "bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-8 mb-4 sm:mb-6" },
                React.createElement('div', { className: "flex items-center gap-3 mb-4 sm:mb-6" },
                    React.createElement('div', { className: "p-2 bg-blue-100 rounded-xl" },
                        React.createElement(ListTodo, { className: "w-6 h-6 sm:w-8 sm:h-8 text-blue-600" })
                    ),
                    React.createElement('h1', { className: "text-2xl sm:text-3xl font-bold text-slate-800" }, "Todo List")
                ),
                
                // Add new task
                React.createElement('div', { className: "flex flex-col sm:flex-row gap-3" },
                    React.createElement('input', {
                        type: "text",
                        value: newTask,
                        onChange: (e) => setNewTask(e.target.value),
                        onKeyPress: handleKeyPress,
                        placeholder: "Add your tasks here...",
                        className: "flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all text-sm sm:text-base",
                        disabled: isLoading
                    }),
                    React.createElement('button', {
                        onClick: addTask,
                        disabled: isLoading || !newTask.trim(),
                        className: "px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all font-medium text-sm sm:text-base"
                    },
                        React.createElement(Plus, { className: "w-5 h-5" }),
                        isLoading ? 'Adding...' : 'Add'
                    )
                )
            ),

            // Tasks list
            React.createElement('div', { className: "space-y-2 sm:space-y-3" },
                tasks.map((task) => 
                    React.createElement('div', { 
                        key: task.id, 
                        className: `bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 transition-all hover:shadow-md ${task.completed ? 'opacity-60' : ''}`
                    },
                        React.createElement('div', { className: "flex items-start gap-3" },
                            React.createElement('button', {
                                onClick: () => toggleTask(task.id),
                                className: "mt-0.5 text-gray-400 hover:text-blue-500 transition-colors flex-shrink-0"
                            },
                                task.completed ? 
                                    React.createElement(CheckSquare, { className: "w-5 h-5 text-blue-500" }) : 
                                    React.createElement(Square, { className: "w-5 h-5" })
                            ),
                            
                            React.createElement('div', { className: "flex-1 min-w-0" },
                                React.createElement('div', { className: "flex items-center justify-between gap-2 mb-1" },
                                    React.createElement('h3', { 
                                        className: `text-sm sm:text-base font-semibold flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-slate-800'}`
                                    }, task.title),
                                    React.createElement('div', { className: "flex items-center gap-2 flex-shrink-0" },
                                        React.createElement('span', { className: "text-xs text-gray-500 hidden sm:inline" },
                                            formatDateTime(task.createdAt)
                                        ),
                                        React.createElement('button', {
                                            onClick: () => deleteTask(task.id),
                                            className: "text-gray-400 hover:text-red-500 transition-colors",
                                            title: "Delete task"
                                        },
                                            React.createElement(Trash2, { className: "w-4 h-4" })
                                        )
                                    )
                                ),
                                
                                // Show datetime on mobile
                                React.createElement('div', { className: "text-xs text-gray-500 mb-1 sm:hidden" },
                                    formatDateTime(task.createdAt)
                                ),
                                
                                task.isEditing ? 
                                    React.createElement('div', { className: "mb-1" },
                                        React.createElement('input', {
                                            type: "text",
                                            defaultValue: task.description,
                                            className: "w-full px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm",
                                            onBlur: (e) => editDescription(task.id, e.target.value),
                                            onKeyPress: (e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    editDescription(task.id, e.target.value);
                                                }
                                            },
                                            autoFocus: true
                                        })
                                    ) : (
                                        task.description && 
                                        React.createElement('p', {
                                            className: `cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-600'}`,
                                            onClick: () => toggleEdit(task.id),
                                            title: "Click to edit description"
                                        }, task.description)
                                    )
                            )
                        )
                    )
                )
            ),

            tasks.length === 0 && 
            React.createElement('div', { className: "text-center py-12" },
                React.createElement('div', { className: "p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center" },
                    React.createElement(ListTodo, { className: "w-10 h-10 text-gray-400" })
                ),
                React.createElement('p', { className: "text-gray-500 text-lg" },
                    "No tasks yet. Add your first task above!"
                )
            )
        )
    );
};

ReactDOM.render(React.createElement(TodoApp), document.getElementById('root'));
