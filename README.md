# Todo List App

A modern, responsive todo list application built with React and Tailwind CSS. Features persistent storage, mobile-friendly design, and a clean user interface.

## 🚀 Features

- ✅ **Persistent Storage** - Tasks are saved automatically and persist across browser sessions
- 📱 **Mobile Responsive** - Optimized for both desktop and mobile devices
- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 🕐 **Timestamp Tracking** - See exactly when each task was created
- ✏️ **Editable Descriptions** - Click on task descriptions to edit them
- 🔄 **Real-time Updates** - Changes are saved automatically

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful, customizable icons
- **LocalStorage API** - For persistent data storage
- **Vanilla JavaScript** - No build tools required

## 📦 Installation & Setup

### Option 1: Direct Usage (Recommended)
1. Download the `index.html` file
2. Open it in any modern web browser
3. Start adding your tasks!

### Option 2: Local Development
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## 🎯 Usage

1. **Add Tasks**: Type your task in the input field and click "Add" or press Enter
2. **Mark Complete**: Click the checkbox next to any task to mark it as completed
3. **Delete Tasks**: Click the trash icon to permanently delete a task
4. **Edit Descriptions**: Click on any task description to edit it inline
5. **Persistent Storage**: Your tasks are automatically saved and will persist even after closing the browser

## 🎨 Features Overview

### Task Management
- Add new tasks with automatic Pascal Case formatting
- Mark tasks as complete/incomplete
- Delete tasks permanently
- Edit task descriptions inline

### Storage & Persistence
- Multiple storage fallback methods (localStorage, sessionStorage, cookies)
- Automatic save on every change
- Cross-browser compatibility

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts for different screen sizes

## 🔧 Customization

You can easily customize the app by modifying:

- **Colors**: Update the Tailwind CSS classes in the HTML
- **Icons**: Replace Lucide icons with your preferred icon set
- **Storage**: Modify the storage methods in the `saveToStorage` function
- **Styling**: Adjust the CSS classes for different visual themes

## 🌟 Browser Support

This app works in all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📱 Mobile Support

Fully optimized for mobile devices with:
- Touch-friendly buttons and inputs
- Responsive layout that adapts to screen size
- Mobile-specific UI adjustments

## 🤝 Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)
- Built with [React](https://reactjs.org/)

---

**Made with ❤️ for productivity enthusiasts**

## 🚀 Quick Start

```bash
# Download the repository
git clone https://github.com/yourusername/todo-list-app.git

# Navigate to the project
cd todo-list-app

# Open in browser
open index.html
```

That's it! Your todo list app is ready to use. 🎉
