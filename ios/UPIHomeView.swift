import SwiftUI

struct UPIHomeView: View {
  let callback: (NSDictionary) -> Void
  @Environment(\.presentationMode) var presentationMode

  var body: some View {
    VStack {
      HStack {
        Text("Native Screen")
          .font(.title)
          .fontWeight(.bold)
          .padding()
        Spacer()
      }
      Spacer()
      Button(action: {
        presentationMode.wrappedValue.dismiss()
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
          callback(["action": "openPaymentDetails"])
        }
      }) {
        VStack(spacing: 8) {
          ZStack {
            Circle()
              .fill(Color(red: 0.83, green: 0.35, blue: 0.11)) // #d4591c
              .frame(width: 140, height: 140)
            Image(uiImage: UIImage(named: "upi-icon") ?? UIImage())
              .resizable()
              .aspectRatio(contentMode: .fit)
              .frame(width: 80, height: 120)
          }
          Text("UPI Circle")
            .font(.system(size: 18, weight: .bold))
            .foregroundColor(.black)
        }
      }
      Spacer()
    }
    .background(Color.white.ignoresSafeArea())
  }
}
