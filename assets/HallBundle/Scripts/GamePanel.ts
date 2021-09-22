/**
 * 
 * 
 * @author Mortal-Li
 * @created 2021年9月18日
 */

import { LayerConf } from "../../Boot/Scripts/AssetConfig";
import ceo from "../../sparrow/ceo";
import UIBase from "../../sparrow/ui/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePanel extends UIBase {
    
    onLoad () {

    }

    start () {

    }

    onBtnClick(evt: cc.Event.EventTouch, name: string) {
        switch (name) {
            case "gameA":
                ceo.uiMgr.gotoLayer(LayerConf.GameA);
                break;
                
        }
    }
}
