import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from 'src/registerServiceWorker';
import { Provider } from 'react-redux';
import { configureStore } from "src/redux/configureStore";
import { GameView } from "src/components/GameView";
import 'src/index.scss';

const store = configureStore();

const rootNode = document.getElementsByClassName('root')[0] as HTMLElement;

ReactDOM.render(
    <Provider store={store}>
        <GameView/>
    </Provider>,
    rootNode
);
registerServiceWorker();

const minRatio = 0.4;
const maxRatio = 0.65;
const minWidth = 800;
const minHeight = 600;

/**
 * This handles the basic case for needing to scale: when the user has resized their browser such that a window
 * dimension is smaller than we can support.
 *
 * In this case, we want to prevent the aspect ratio from changing at all so as to avoid double-accounting.
 * Because we aren't enforcing the aspect ratio (which sets width/height), we can't look at the rootNode to get
 * the width and height to pivot off of--because they would never change now that we aren't preserving aspect ratio.
 */
const tryScale = (): boolean => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < minWidth) {
        rootNode.style.transform = "scale(" + width / minWidth + ")";
        return true;
    } else if (height < minHeight ) {
        rootNode.style.transform = "scale(" + height / minHeight + ")";
        return true;
    } else {
        // We're within acceptable dimensions; no need to scale anything
        rootNode.style.transform = "scale(" + 1 + ")";
        return false;
    }
};

/**
 * There exists a case where keeping our aspect ratio in check might put the root node to a smaller width/height
 * than what is allowed.
 *
 * In this case, we need to base our width and height off of the rootNode, because it no longer matches our window
 * dimensions.
 *
 * TODO: I'm not 100% convinced that we need both this and tryScale, but I can't figure out a way to get tryScale
 * TODO: to dependably look at the rootNode dimensions *and* stop changing aspect ratios...
 */
const tryScaleFromNode = (): boolean => {
    const width = rootNode.offsetWidth;
    const height = rootNode.offsetHeight;

    if (width < minWidth) {
        rootNode.style.transform = "scale(" + width / minWidth + ")";
        return true;
    } else if (height < minHeight ) {
        rootNode.style.transform = "scale(" + height / minHeight + ")";
        return true;
    } else {
        // We're within acceptable dimensions; no need to scale anything
        rootNode.style.transform = "scale(" + 1 + ")";
        return false;
    }
};

/**
 * Keeps the game's aspect ratio within the specified bounds by setting widths and heights on the root node.
 */
const tryPreserveAspectRatio = (): boolean => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = height / width;

    if (ratio > maxRatio) {
        // Really tall and thin
        rootNode.style.height = width * maxRatio + "px";
        rootNode.style.width = width + "px";
        return true;
    } else if (ratio < minRatio) {
        // Really short and wide
        rootNode.style.width = height / minRatio + "px";
        rootNode.style.height = height + "px";
        return true;
    } else {
        // We didn't set the ratio, so reset our width/height to let things flow naturally
        rootNode.style.height = "100%";
        rootNode.style.width = "";
        return false;
    }
};

const resizeHandler = () => {
    const didScale = tryScale();
    if (!didScale) {
        const didSetAspectRatio = tryPreserveAspectRatio();
        if (didSetAspectRatio) {
            tryScaleFromNode();
        } else {
            rootNode.style.width = window.innerWidth + "px";
            rootNode.style.height = window.innerHeight + "px";
        }
    }
};

window.addEventListener('resize', resizeHandler);
rootNode.style.width = window.innerWidth + "px";
rootNode.style.height = window.innerHeight + "px";
resizeHandler();