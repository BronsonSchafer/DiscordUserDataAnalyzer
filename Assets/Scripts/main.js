// run with `npm start`

const electron = require('electron');
const url = require('url')
const path = require('path');

const {app, BrowserWindow, dialog, Menu} = electron;
const fs = require('fs');

let mainWindow;
// keeps track of all open windows 
// this will block the same window from being openned more than once
const openWindows = [];

// Listen for app to be ready 
app.on('ready', function(){
    // create new window 
    mainWindow = new BrowserWindow({});
    // load html into window 
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit all apps when closed 
    mainWindow.on('closed', function(){
        app.quit();
    })

    // Build the menu from the template 
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert the menu
    Menu.setApplicationMenu(mainMenu);
});

// handle help page
function openHelpMenu(){
    // gives a name for tracking 
    const winName = "help";

    // checks if a window is already open 
    if(isOpen(winName)){
        return;
    }

    // create new window 
    addWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "Help Menu"
    });
    // load html into window 
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'helpMenu.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
        removeWindow(winName);
    });
}

// handle about page page
function openAboutMenu(){
    // create new window 
    addWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "About Page"
    });
    // load html into window 
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'aboutWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}

// create menu template 
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Open File',
                accelerator: 'CMDOrCtrl+O',
                click(){
                    openFile();
                }
            },
            {
                label: 'Quit', 
                // checks for hot key to quit 
                accelerator: process.platform == 'darwin' ? 'Commmand+Q' : 'Ctrl+Q',
                // checks for the button click to quit
                click(){app.quit()}
            }
        ]
    },
    {
        label: 'Help',
        click(){openHelpMenu();}
    },
    {
        label: 'About',
        click(){ openAboutMenu();}
    },  
    {
        label: 'Quit', 
        // checks for hot key to quit 
        accelerator: process.platform == 'darwin' ? 'Commmand+Q' : 'Ctrl+Q',
        // checks for the button click to quit
        click(){app.quit()}
    },
];
// if on mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// open file
function openFile(){
    // open files looking for any type
    const {dialog} = require('electron');
    const files = dialog.showOpenDialogSync(mainWindow, {
        properties: ['openDirectory'],
        filters: [
            { name: 'Discord Package', extensions: ['*'] }
          ]
    });

    // if no files 
    if(!files) return;
    console.log(files.toString());

    const fileContent = fs.readdirSync(files.toString());
    console.log(fileContent);
}

// checks if a window is already open
// adds it if not open 
function isOpen(window){
    if (openWindows.includes(window)){
        return true;
    }
    // else
    openWindows.push(window);
    return false;
}
// removes open window when closed
function removeWindow(window){
    const index = openWindows.indexOf(window);
    // checks that the index is valid
    console.log(openWindows);
    if (index > -1){
        openWindows.splice(index, 1);
    }
    console.log(openWindows);
}