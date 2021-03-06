/*
 * Copyright (C) 2017-2020 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { Container, ContainerModule } from "inversify";
import {configureModelElement, ConsoleLogger, HtmlRoot, ExpandButtonHandler, SButton, ExpandButtonView, SCompartmentView, SCompartment, HtmlRootView,
    LogLevel,  overrideViewerOptions, PreRenderedElement,
    PreRenderedView, SEdge, SGraphView, SLabelView, CustomFeatures, TYPES, openFeature, moveFeature, selectFeature, loadDefaultModules, SGraph, SLabel} from 'sprotty';
    import {
        ResourceNodeView, GoalNodeView, SoftgoalNodeView, BeliefNodeView, TaskNodeView, IndicatorNodeView, HeaderCompartmentView, ModuleNodeView, SoftgoalNodeViewTry,
        ContributeEdgeView, CorrelationEdgeView, DecompositionEdgeView, DependencyEdgeView
    } from "./views";
import { TURNLabel, TURNNode } from "./turn-models";
import { TURNModelFactory } from "./model-factory";
import 'sprotty/css/sprotty.css'

const turnDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope()
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn)
    rebind(TYPES.IModelFactory).to(TURNModelFactory).inSingletonScope()

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraph, SGraphView);
    configureModelElement(context, 'turnnode:goal', TURNNode, GoalNodeView)
    configureModelElement(context, 'turnnode:softgoal', TURNNode, SoftgoalNodeView)
    configureModelElement(context, 'turnnode:softgoaltry', TURNNode, SoftgoalNodeViewTry)
    configureModelElement(context, 'turnnode:belief', TURNNode, BeliefNodeView)
    configureModelElement(context, 'turnnode:actor', TURNNode, ModuleNodeView)
    configureModelElement(context, 'turnnode:task', TURNNode, TaskNodeView)
    configureModelElement(context, 'turnnode:indicator', TURNNode, IndicatorNodeView)
    configureModelElement(context, 'turnnode:resource', TURNNode, ResourceNodeView)
    configureModelElement(context, 'label:heading', SLabel, SLabelView)
    configureModelElement(context, 'label:text', SLabel, SLabelView)
    configureModelElement(context, 'turnlabel:text', TURNLabel, SLabelView)
    configureModelElement(context, 'label:classHeader', SLabel, SLabelView)
    configureModelElement(context, 'comp:comp', SCompartment, SCompartmentView)
    configureModelElement(context, 'comp:classHeader', SCompartment, HeaderCompartmentView)
    configureModelElement(context, 'edge:dependency', SEdge, DependencyEdgeView)
    configureModelElement(context, 'edge:decomposition', SEdge, DecompositionEdgeView)
    configureModelElement(context, 'edge:contribute', SEdge, ContributeEdgeView)
    configureModelElement(context, 'edge:correlated', SEdge, CorrelationEdgeView)
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView)
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView)
    configureModelElement(context, ExpandButtonHandler.TYPE, SButton, ExpandButtonView)
    // const nodeFeatures: CustomFeatures = {
    //     disable: [moveFeature],
    //     enable: [openFeature]
    // };
    // configureModelElement(context, 'turnnode:goal', TURNNode, GoalNodeView)
    // configureModelElement(context, 'turnnode:softgoal', TURNNode, SoftgoalNodeView)
    // configureModelElement(context, 'turnnode:softgoaltry', TURNNode, SoftgoalNodeViewTry)
    // configureModelElement(context, 'turnnode:belief', TURNNode, BeliefNodeView)
    // configureModelElement(context, 'turnnode:actor', TURNNode, ModuleNodeView)
    // configureModelElement(context, 'turnnode:task', TURNNode, TaskNodeView)
    // configureModelElement(context, 'turnnode:indicator', TURNNode, IndicatorNodeView)
    // configureModelElement(context, 'turnnode:resource', TURNNode, ResourceNodeView)
    // const labelFeatures: CustomFeatures = {
    //     enable: [selectFeature, openFeature]
    // };
    // configureModelElement(context, 'label:heading', SLabel, SLabelView, labelFeatures);
    // configureModelElement(context, 'label:text', SLabel, SLabelView, labelFeatures);
    // configureModelElement(context, 'turnlabel:text', TURNLabel, SLabelView, labelFeatures);
    // configureModelElement(context, 'label:classHeader', SLabel, SLabelView, labelFeatures)
    // configureModelElement(context, 'comp:comp', SCompartment, SCompartmentView, labelFeatures)
    // configureModelElement(context, 'comp:classHeader', SCompartment, HeaderCompartmentView)
    // configureModelElement(context, 'edge:dependency', SEdge, DependencyEdgeView)
    // configureModelElement(context, 'edge:decomposition', SEdge, DecompositionEdgeView)
    // configureModelElement(context, 'edge:contribute', SEdge, ContributeEdgeView)
    // configureModelElement(context, 'edge:correlated', SEdge, CorrelationEdgeView)
    // configureModelElement(context, 'html', HtmlRoot, HtmlRootView)
    // configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView)
    // configureModelElement(context, ExpandButtonHandler.TYPE, SButton, ExpandButtonView)
})

export default function createContainer(widgetId: string): Container {
    const container = new Container()
    loadDefaultModules(container);
    container.load(turnDiagramModule);

    overrideViewerOptions(container, {
        needsClientLayout: true,
        needsServerLayout: true,
        baseDiv: widgetId
    })
    return container
}
