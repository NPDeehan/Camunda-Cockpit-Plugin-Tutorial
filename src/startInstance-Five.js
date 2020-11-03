export default {
  // id for plugin
  id: "myDemoPlugin",
  // location where plugin goes
  pluginPoint: "cockpit.processDefinition.runtime.action",
  // what to render, specific objects that you can pass into render function to use
  render: (node, { api, processDefinitionId }) => {
    // create the actual button with an image inside + hard-wired styling
    node.innerHTML = `<button class="btn btn-default action-button" style="width: 40px; margin-top: 5px;"><img src="../scripts/corgi.gif" width="20"/></button>`;
    // onclick function for our button
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
  },
};