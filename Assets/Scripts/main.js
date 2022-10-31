const electron = require('electron');
const url = require('url')
const path = require('path');

const {app, BrowserWindow, dialog, Menu} = electron;
const fs = require('fs');

let mainWindow;

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
        label: 'About'
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

// Add developer tools if not in production 
if(process.env.NODE_ENV != 'productuion'){
    mainMenuTemplate.push(
        {
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Commmand+I' : 'Ctrl+I',

                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    }
    );
}

// open file
function openFile(){
    // open files looking for any type
    const {dialog} = require('electron');
    const files = dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        filters: [
            { name: 'Discord Package', extensions: ['*'] }
          ]
    });

    // if no files 
    if(!files) return;
    console.log(files.toString());
    const file = files[0];
    const fileContent = fs.readFileSync(file).toString();
    console.log(fileContent);
}