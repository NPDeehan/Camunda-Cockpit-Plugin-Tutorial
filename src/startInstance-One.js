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