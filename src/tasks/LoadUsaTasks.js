import { features } from '../datajson/us-states.json'
class LoadUsaTasks {
    mapUsStates = features
    setUsState = null
    load = (setUsState) => {
        setUsState(features);
        // console.log(features)
    }
}

export default LoadUsaTasks;

