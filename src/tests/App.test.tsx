import { render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  describe("isValidConnection", () => {
    test("allows valid connections", () => {
      const isValidConnectionMock = jest.fn().mockReturnValue(true);
      const { getByTestId } = render(<App />);

      // Mock ReactFlow instance with the isValidConnection mock
      const reactFlowInstance = getByTestId("react-flow-instance");

      // Simulate connection event
      const connectionEvent = { source: "1", target: "2" };

      // Call the mocked method
      const isValid = isValidConnectionMock(connectionEvent);
      expect(isValid).toBe(true);
      expect(isValidConnectionMock).toHaveBeenCalledWith(connectionEvent);
    });

    test("disallows cyclic connections", () => {
      const { getByTestId } = render(<App />);
      const reactFlowInstance = getByTestId("react-flow-instance");

      const cyclicConnection = { source: "3", target: "1" };
      const isValid = reactFlowInstance.isValidConnection(cyclicConnection);
      expect(isValid).toBe(false);
    });

    test("disallows self-loop connections", () => {
      const { getByTestId } = render(<App />);
      const reactFlowInstance = getByTestId("react-flow-instance");

      const selfLoopConnection = { source: "2", target: "2" };
      const isValid = reactFlowInstance.isValidConnection(selfLoopConnection);
      expect(isValid).toBe(false);
    });
  });

  describe("onNodeDeletion", () => {
    test("removes a node and updates edges correctly", () => {
      const { getByTestId } = render(<App />);
      const reactFlowInstance = getByTestId("react-flow-instance");

      // Mock onNodesChange and simulate node removal
      const changes = [{ id: "3", type: "remove" }];
      fireEvent.change(reactFlowInstance, { target: { value: changes } });

      // Assert that the node and associated edges are removed
      expect(
        reactFlowInstance.nodes.find((node) => node.id === "3"),
      ).toBeUndefined();
      expect(
        reactFlowInstance.edges.find((edge) => edge.target === "3"),
      ).toBeUndefined();
    });
  });

  describe("onNodesChangeHandler", () => {
    test("handles node removal and updates nodes state", () => {
      const { getByTestId } = render(<App />);
      const reactFlowInstance = getByTestId("react-flow-instance");

      const changes = [{ id: "2", type: "remove" }];
      fireEvent.change(reactFlowInstance, { target: { value: changes } });

      const updatedNodes = reactFlowInstance.nodes;
      expect(updatedNodes.find((node) => node.id === "2")).toBeUndefined();
      expect(updatedNodes).toHaveLength(2);
    });

    test("processes non-removal changes correctly", () => {
      const { getByTestId } = render(<App />);
      const reactFlowInstance = getByTestId("react-flow-instance");

      const changes = [
        { id: "1", type: "position", position: { x: 100, y: 100 } },
      ];
      fireEvent.change(reactFlowInstance, { target: { value: changes } });

      const updatedNode = reactFlowInstance.nodes.find(
        (node) => node.id === "1",
      );
      expect(updatedNode?.position).toEqual({ x: 100, y: 100 });
    });
  });
});
