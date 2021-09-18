/**
 * 
 * @author Mortal-Li
 * @created 2021年9月18日
 */

import { LayerConf } from "../../Boot/Scripts/AssetConfig";
import ceo from "../../sparrow/ceo";
import CocosHelper from "../../sparrow/tools/CocosHelper";
import LayerBase from "../../sparrow/ui/LayerBase";
import GameData from "./common/GameData";
import { SoundID, LocalKey } from "./common/MainConst";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadLayer extends LayerBase {
    
    @property(cc.ProgressBar)
    pb: cc.ProgressBar = null;

    onLoad () {
        ceo.soundMgr.prepare(SoundID.Bundle, SoundID.Path);
        const musicState = ceo.localMgr.getItemWithDefault(LocalKey.Switch_Music, true);
        const effectState = ceo.localMgr.getItemWithDefault(LocalKey.Switch_Effect, true);
        ceo.soundMgr.setMusicVolume(musicState ? 1 : 0);
        ceo.soundMgr.setEffectsVolume(effectState ? 1 : 0);
        GameData.music_switch = musicState;
        GameData.effect_switch = effectState;

        CocosHelper.asyncTween(this.pb, cc.tween().to(0.1, { progress: 0.1 }));
    }

    async start () {
        // net req、res load ...  
        await CocosHelper.asyncTween(this.pb, cc.tween().to(0.1, { progress: 0.4 }));
        await CocosHelper.asyncTween(this.pb, cc.tween().to(0.1, { progress: 0.8 }));
        
        CocosHelper.asyncTween(this.pb, cc.tween().to(0.1, { progress: 1 }));
        ceo.uiMgr.gotoLayer(LayerConf.Hall);
    }

}
