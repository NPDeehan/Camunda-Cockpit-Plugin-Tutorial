# Camunda Cockpit Plugin Tutorial
This project is used to create a plugin that lets you start a process instance from Camunda Cockpit. It does this through the Cockpit Plugin system. This examples is used as part of the Camunda Cockpit Plugin tutorial video.


## Step Zero - Download the Requirements
For this tutoral you'll need the following:
1. [Java Runtime installed](https://docs.oracle.com/goldengate/1212/gg-winux/GDRAD/java.htm#BGBFJHAB)
1. [Camunda Tomcat distribution](https://camunda.com/download/)
1. [Camunda Modeler](https://camunda.com/download/modeler/)
1. Some kind of JavaScript editor (e.g. [Visual Studio Code](https://code.visualstudio.com/))

## Step One: Build a Button

Most of the action is going to happen in on specific directory.

`<Camunda-Distro>\server\apache-tomcat-9.0.36\webapps\camunda\app\cockpit\scripts`

The ``startInstance.js`` will need to be created and the ``config.js`` file will need to be edited.

In the first case the ``startInstance.js`` file will just create a visible button.

```javaScript
export default {
  // id for plugin
  id: "myDemoPlugin",
  // location where plugin goes
  pluginPoint: "cockpit.processDefinition.runtime.action",
  // what to render, specific objects that you can pass into render function to use
  render: (node, { api, processDefinitionId }) => {
    // create the actual button with an image inside + hard-wired styling
    node.innerHTML = `<button class="btn btn-default action-button" style="width: 40px; margin-top: 5px;"></button>`;
    // onclick function for our button
   
  },
};
```

while the ``config.js`` will tell cockpit where to find the file. 

```JavaScript
export default {
   customScripts: [
    'scripts/startInstance.js'
  ]
  
 ``` 

## Step Two: Add a Function and Corgi

This step involves adding the ``corgi.gif`` file to the ``scripts`` directory and then adding it to the button as an icon.

```JavaScript
    node.innerHTML = `<button class="btn btn-default action-button" style="width: 40px; margin-top: 5px;"><img src="../scripts/corgi.gif" width="20"/></button>`;

```

The second part involves adding some functionality specifically the ability for the button to print somethign to the console. 

```JavaScript
  node.onclick = function() {
      console.log("Saying Hi")
    }
```

## Step Three: Start the process instance

In this step we remove the console loging we did before and replace it with a rest call. 

```JavaScript
      node.onclick = function() {
      
      fetch(api.engineApi + "/process-definition/" + processDefinitionId  + "/start", {
        method: 'post',
        body: '{}',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": api.CSRFToken,
        },
      })
    }
```

## Step Four: Show the user the started process
In the final section we shall add an addional line of code that redirects the user to the started instance by using the respons from the start instance rest call. 

```JavaScript
node.onclick = function() {
      
      fetch(api.engineApi + "/process-definition/" + processDefinitionId  + "/start", {
        method: 'post',
        body: '{}',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": api.CSRFToken,
        },
      }).then(async (res) => {
        var result = await res.json();
        // Reloads Page
        // location.reload();
        // Go to process instance page
        window.location.href = "http://localhost:8080/camunda/app/cockpit/default/#/process-instance/" + result.id + "/runtime";
      });
    }
``` 