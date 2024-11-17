/**
 * @typedef {'ddd'|'title'|'dddSponsors'|'intro1'|'intro2'|'intro3'|'intro4'|'hub'|'logging1'|'components1'|'components2'|'observables1'|'observables2'|'store1'|'store2'|'eventBinding1'|'dispatchActionHandling1'|'dispatchActionHandling2'|'dispatchActionHandling3'|'dataBinding1'|'demo'|'outro1'|'outro2'|'outro3'} PageContentId
 */

/**
 * @typedef {'dddBackground'|'titleBackground'|'introBackground'|'hubBackground'|'sectionBackground'|'demoBackground'|'outroBackground'} PageBackgroundId
 */

/**
 * @typedef {'ddd'|'title'|'dddSponsors'|'intro1'|'intro2'|'intro3'|'intro4'|'hub'|'logging1'|'components1'|'components2'|'observables1'|'observables2'|'store1'|'store2'|'eventBinding1'|'dispatchActionHandling1'|'dispatchActionHandling2'|'dispatchActionHandling3'|'dataBinding1'|'demo'|'outro1'|'outro2'|'outro3'} PageNodeId
 */

/**
 * @typedef {'demoObservableElement'|'demoObservingElement1'|'demoObservingElement2'|'demoObservingElement3'} AppComponents
 */

/**
 * @typedef {'pagesContainer'|'backgroundsContainer'|'AppModelAppStructure'|'appModelComponents'|'appModelEventBindings'|'appModelActionDispatch'|'appModelHandlers'|'appModelStore'|'appModelDataBindings'|'appModelObservables'|'appModelLogging'|'appModelHelpers'|'solveIcon'} AppElements
 */

/**
 * An object to define overall presentation structure
 * @typedef {{backgrounds: Array<BackgroundDefinition>, contentPages: Array<ContentPageDefinition>, pageNodes: Array<PageNodeDefinition>, bidirectionalTransitions: Array<BidirectionalTransitionDefinition>, backOnlyTransitions: Array<BackOnlyTransitionDefinition>, basicPageRevealAnimations: Array<BasicPageRevealAnimationsDefinition>, customPageAnimations: Array<CustomPageAnimationsDefinition>, customBackgroundAnimations: Array<CustomBackgroundAnimationsDefinition>}} PresentationDefinition
 */

/**
 * An object to define the page background templates
 * @typedef {{objectId: PageBackgroundId, contentClass: string, pageSlidingRangeX: number, pageSlidingRangeY: number}} BackgroundDefinition
*/

/**
 * An object to define the content pages 
 * @typedef {{objectId: PageContentId}} ContentPageDefinition
*/

/**
 * An object to define the page nodes (the structural composition and sequencing of content and backgrounds) 
 * @typedef {{objectId: PageNodeId, backgroundId: PageBackgroundId, pageContentId: PageContentId, backgroundPagingPosX: number?, backgroundPagingPosY: number?, backgroundTransformer: string?, includeBackgroundAnimation: boolean?}} PageNodeDefinition
*/

/**
 * An object to define the bidirectional page transitions 
 * @typedef {{pageNodeId: PageNodeId, destinationPageNodeId: PageNodeId, forwardTransition: PageTransition, backTransition: PageTransition?, duration: number}} BidirectionalTransitionDefinition
*/

/**
 * An object to define the unidirectional backward transitions 
 * @typedef {{pageNodeId: PageNodeId, destinationPageNodeId: PageNodeId, backTransition: PageTransition?, duration: number}} BackOnlyTransitionDefinition
*/

/**
 * An object to define basic page reveal animations 
 * @typedef {{pageContentId: PageContentId, pageOverlay: boolean, revealSteps: number}} BasicPageRevealAnimationsDefinition
*/

/**
 * An object to define custom page animations 
 * @typedef {{pageContentId: PageContentId, pageOverlay: boolean, animation: Array<PageAnimationDefinition>}} CustomPageAnimationsDefinition
*/

/**
 * An object to define custom background animations 
 * @typedef {{backgroundId: PageBackgroundId, animation: Array<BackgroundAnimationDefinition>}} CustomBackgroundAnimationsDefinition
*/

/**
 * A string key dictionary of any
 * @typedef {Dictionary<*>} AnyDictionary
 */

/**
 * An object to standardise action handlers in the system
 * @typedef {{handler: FunctionDictionary, routerName: string}} ActionHandler
 */

/**
 * A string key dictionary of functions
 * @typedef {Dictionary<Function>} FunctionDictionary
 */

/**
 * A object to standardise animation steps for in page content
 * @typedef {{key: string, classes: Array<string>}} PageAnimationStep
 */

/**
 * An object to standardise animation step collections for in page content
 * @typedef {{add: Array<PageAnimationStep>?, remove: Array<PageAnimationStep>?}} PageAnimationDefinition
 */

/**
 * An object to standardise in page animations
 * @typedef {{[k: string]: PageAnimationProperty}} InPageAnimations
 */

/**
 * An animation property for a page
 * @typedef {Object} PageAnimationProperty
 * @property {boolean} animationEnabled
 * @property {Array<PageAnimationDefinition>} animationSteps
 * @property {number} currentAnimationStep
 */

/**
 * An animation property for a page
 * @typedef {Object} BackgroundAnimationProperty
 * @property {boolean} animationEnabled
 * @property {Array<BackgroundAnimationDefinition>} animationSteps
 * @property {number} currentAnimationStep
 */

/**
 * An object to standardise animation step collections for in page content
 * @typedef {{add: Array<BackgroundAnimationStep>?, remove: Array<BackgroundAnimationStep>?}} BackgroundAnimationDefinition
 */

/**
 * A object to standardise animation steps for in page content
 * @typedef {{classes: Array<string>}} BackgroundAnimationStep
 */

/**
 * Options for CSS transition timing functions
 * @typedef {'ease'|'ease-in'|'ease-out'|'ease-in-out'|'linear'|'step-start'|'step-end'} TimingFunction
 */

/**
 * A dictionary of T
 * @template T Whatever you want :D
 * @typedef {{[k: string]: T}} Dictionary<T>
 */

/**
 * A dictionary of T with keys in K
 * @template {string} Key
 * @template Value
 * @typedef {{[k in Key]: Value}} LimitedDictionary<Key, Value>
 */

/**
 * A observable callback
 * @typedef {(event: ObservableDataEvent) => void} ObservableCallback
 */

/**
 * An input event callback
 * @template T
 * @typedef {(arg0: T) => void} Callback
 */

/**
 * @typedef {Object} EventBase
 * @property {Event} originatingEvent
 * @property {*} originatingObject
 */
            