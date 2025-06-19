import Foundation
import React
import SwiftUI


@objc(NativeBridge)
class NativeBridge: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func openUPIHomeScreen(_ data: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
    DispatchQueue.main.async {
      let upiHomeView = UPIHomeView { result in
        callback([result])
      }
      let hostingController = UIHostingController(rootView: upiHomeView)
      hostingController.modalPresentationStyle = .fullScreen
      let keyWindow = UIApplication.shared.connectedScenes
        .filter { $0.activationState == .foregroundActive }
        .compactMap { $0 as? UIWindowScene }
        .first?.windows
        .filter { $0.isKeyWindow }
        .first
      if let rootViewController = keyWindow?.rootViewController {
        rootViewController.present(hostingController, animated: true)
      }
    }
  }

  @objc
  func openPinScreen(_ data: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
    DispatchQueue.main.async {
      let pinView = SwiftUIView(data: data) { result in
        callback([result])
      }
      let hostingController = UIHostingController(rootView: pinView)
      hostingController.modalPresentationStyle = .fullScreen
      let keyWindow = UIApplication.shared.connectedScenes
        .filter { $0.activationState == .foregroundActive }
        .compactMap { $0 as? UIWindowScene }
        .first?.windows
        .filter { $0.isKeyWindow }
        .first
      if let rootViewController = keyWindow?.rootViewController {
        rootViewController.present(hostingController, animated: true)
      }
    }
  }
  
}
