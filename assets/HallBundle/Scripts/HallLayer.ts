/**
 * 
 * @author Mortal-Li
 * @created 2021年9月18日
 */

import { PanelConf } from "../../Boot/Scripts/AssetConfig";
import GameData from "../../MainBundle/Scripts/common/GameData";
import { GameCustomEvent } from "../../MainBundle/Scripts/common/MainConst";
import ceo from "../../sparrow/ceo";
import { doOnceFirst } from "../../sparrow/tools/Decorators";
import LayerBase from "../../sparrow/ui/LayerBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallLayer extends LayerBase {

    onLoad () {
        ceo.eventMgr.on(GameCustomEvent.Update_GEM, this.updateGems, this);
    }

    start () {
        this.doPanelChange(true);
    }

    refresh() {
        this.start();
    }

    @doOnceFirst(0.8)
    onBtnClick(evt: cc.Event.EventTouch, name: string) {
        let T = this;

        switch (name) {
            case "test":
                T.doPanelChange(true);
                break;
        
            case "game":
                T.doPanelChange(false);
                break;
        }
    }

    async doPanelChange(isTest: boolean) {
        let T = this;

        T.getUIObj("btn_test").color = cc.color().fromHEX(isTest ? "#5AC5F2" : "#32A0CF");
        T.getUIObj("btn_game").color = cc.color().fromHEX(isTest ? "#32A0CF" : "#5AC5F2");

        let panel = T.getUIObj("panel");
        panel.removeAllChildren();

        let pnl = await ceo.uiMgr.createPanel(isTest ? PanelConf.Test : PanelConf.Game);
        pnl.parent = panel;
    }

    updateGems() {
        this.getUIObj("bar.lo.num", cc.Label).string = String(GameData.gems);
    }
}
