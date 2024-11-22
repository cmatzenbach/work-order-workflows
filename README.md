# Hadrian Workflow Editor

## Goal:

Complete a take-home project that can serve as the foundation for a more in-depth technical discussion.

## Context:

Hadrian receives Purchase Orders from customers with the information required to manufacture the parts that they’d like to purchase. When we’re ready begin making parts, our Operations team creates a Work Order, which includes information about the part we’re making, the quantity we need to produce, and the date we need to complete the work by.

One of the first things the team needs to do when creating a Work Order is planning the tasks that need to be completed to fulfill the Work Order. The output of the planning process is a flow chart, where each node is a task.

**Example 1**: Linear workflow — complete A, then B, then C.

```
┌───────┐   ┌───────┐   ┌───────┐
│   A   ├──►│   B   ├──►│   C   │
└───────┘   └───────┘   └───────┘
```

**Example 2**: Parallel tasks — when A is complete, you can work on B and C. Both B and C need to be complete prior to working on D.

```
             ┌───────┐
          ┌─►│   B   ├─┐
┌───────┐ │  └───────┘ │  ┌───────┐
│   A   ├─┤            ├─►│   D   │
└───────┘ │  ┌───────┐ │  └───────┘
          └─►│   C   ├─┘
             └───────┘
```

**Example 3**: Advanced parallel tasks — when A is complete, you can work on B and C. When B is complete, you can work on D. Both D and C need to be complete prior to working on E.

```
             ┌───────┐   ┌───────┐
          ┌─►│   B   ├──►│   D   ├─┐
┌───────┐ │  └───────┘   └───────┘ │
│   A   ├─┤                        │  ┌───────┐
└───────┘ │  ┌───────┐       ┌─────┴─►│   E   │
          └─►│   C   ├───────┘        └───────┘
             └───────┘
```

## Starter Project

We've provided a starter project. To get up and running, make sure you have Node and npm installed, then run these two commands:

```bash
$ npm i
$ npm run dev
```

The project has a strict TypeScript and ESLint configuration. We recommend that you configure your editor to lint and format your code (VS Code should do this automatically), or run `npm run lint` periodically.

## Prompt

Please create a React application that would allow someone to create workflows, like the above examples. The starter project has the [React Flow](https://reactflow.dev/) library and a few features already implemented:

1. Adding a new node.
2. Deleting a node (click a node to select it, then press Backspace).
3. Adding a new edge (click and drag from one node handle to another).
4. Deleting an edge (click an edge to select it, then press Backspace).
5. Completing a node (click the node's checkbox to mark the node complete).

The starter project has a few features which are missing or incorrectly implemented. Your task is to implement these features:

1. You should be able to customize the label of each node (e.g. “CNC Machining” or “Ship to Customer”).
2. Nodes should be highlighted in yellow only when they are available to be completed. If a node has any incomplete dependencies, the node is not available, and it should have a white background color. Note: there is an `isAvailable` boolean in `WorkflowNode.tsx` which is currently hard-coded to `true`.
3. It should be impossible to create an edge that would introduce a cycle in workflow. For example, in a workflow `A ⇒ B ⇒ C`, you should not be able to create an edge from B to A or from C to A. Note: the ReactFlow component has an `isValidConnection` prop that can be used to implement this.
4. When a node is deleted, all of the nodes before it should get connected to all of the nodes after it. For example, if you start with the workflow `A ⇒ B ⇒ C` and delete node B, the resulting workflow should be `A ⇒ C`.

We recommend people spend 2-3 hours on this take home, though you’re welcome to spend more time if you’d like (no penalties if you don’t). If you finish the project in less than the allotted time, we’ve included some Side Quests below that you can work on.

## Side Quests

The below are extra features of varying complexity, in no particular order, that you can work on if time permits. You’re welcome to work on all, some, or none of them.

### Increase interactivity granularity

In the core prompt, you implemented interactivity where a user can complete a node and then can continue to complete the next nodes in the workflow.

In reality, however, our workflows track progress at the Part, not Work Order, level. If you have a Work Order to produce 10 Parts that has the workflow `A ⇒ B ⇒ C`, for example, all 10 parts would need to progress through the workflow. I.e. 10 parts start at A, if you complete A for 2 parts, you would then have 8 parts at A and 2 parts at B, so on and so forth.

If you take on this challenge, you could hard-code the number of parts to produce or make the number dynamic.

### Testing

Add tests for the functionality you’ve built.

### Dealer's choice

Add any additional functionality that you think is relevant and can showcase your strengths given the context you have.
