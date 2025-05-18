
const OriginalResizeObserver = global.ResizeObserver;


class MockResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}


global.ResizeObserver = MockResizeObserver;
