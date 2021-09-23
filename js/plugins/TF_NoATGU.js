/*:
 * @plugindesc This plugin gives you the option to remove the 'Attack' and/or the 'Guard' command from the Actor Command Window.
 *
 * @author TamFey
 *
 * @param Disable Attack
 * @desc 0: removes 'Attack' command. 1: keeps 'Attack' command
 * @default 0
 *
 * @param Disable Guard
 * @desc 0: removes 'Guard' command. 1: keeps 'Guard' command
 * @default 0
 */
(function() {
  var parameters = PluginManager.parameters('NoAttackGuard');
  var disableAttack = Number(parameters['Disable Attack'] || 0);
  var disableGuard = Number(parameters['Disable Guard'] || 0);

  Scene_Battle.prototype.createActorCommandWindow = function() {
      console.log(disableAttack + " " + disableGuard);
      this._actorCommandWindow = new Window_ActorCommand();
      if (disableAttack) {
        this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
      }
      this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
      if (disableGuard) {
        this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
      }
      this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
      this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
      this.addWindow(this._actorCommandWindow);
  };

  Window_ActorCommand.prototype.makeCommandList = function() {
    console.log(disableAttack + " " + disableGuard);
      if (this._actor) {
          if (disableAttack) {
            this.addAttackCommand();
          }
          this.addSkillCommands();
          if (disableGuard) {
            this.addGuardCommand();
          }
          this.addItemCommand();
      }
  };

})();
