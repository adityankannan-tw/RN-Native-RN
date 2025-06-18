import SwiftUI
import React
//import RCTRootView


struct ReactNativeView: UIViewRepresentable {
    func makeUIView(context: Context) -> UIView {
        guard let jsBundleURL = Bundle.main.url(forResource: "main", withExtension: "jsbundle") else {
            fatalError("Could not find main.jsbundle in bundle.")
        }

        let rootView = RCTRootView(
            bundleURL: jsBundleURL,
            moduleName: "RNWithSwiftUI",
            initialProperties: nil,
            launchOptions: nil
        )

        return rootView
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        // Nothing to update dynamically for now
    }
}
