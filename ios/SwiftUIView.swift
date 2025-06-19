import SwiftUI

struct SwiftUIView: View {
  let data: NSDictionary
  let callback: (NSDictionary) -> Void

  @State private var text: String = ""
  @State private var enteredNumber: String = ""
  @Environment(\.presentationMode) var presentationMode

  var body: some View {
    VStack(spacing: 0) {
      // Header with title in top left
      HStack {
        Text("Native Screen")
          .font(.title)
          .fontWeight(.bold)
          .padding()
        Spacer()
      }
      
      // Dark blue background section with payment details
      ZStack {
        Color(red: 0.1, green: 0.2, blue: 0.5) // Dark blue color
          .edgesIgnoringSafeArea(.horizontal)
        
        VStack(alignment: .leading, spacing: 16) {
          // Show mobile number and amount from data
          if let mobile = data["mobileNumber"] as? String, !mobile.isEmpty {
            HStack {
              Text("Receipent Mobile Number:")
                .font(.headline)
              Text(mobile)
                .font(.headline)
                .fontWeight(.semibold)
            }
          }
          
          if let amount = data["amount"] as? String, !amount.isEmpty {
            HStack {
              Text("Amount:")
                .font(.headline)
              Text("₹\(amount)")
                .font(.headline)
                .fontWeight(.semibold)
            }
          }
          
          if let name = data["name"] as? String, !name.isEmpty {
            HStack {
              Text("Name:")
                .font(.subheadline)
              Text(name)
                .font(.subheadline)
                .fontWeight(.semibold)
            }
          }
        }
        .foregroundColor(.white)
        .padding()
      }
      .frame(height: 150)
      
      // Display entered numbers
      Text(enteredNumber.isEmpty ? "Enter UPI PIN" : enteredNumber)
        .font(.title2)
        .padding()
        .frame(height: 60)
      
      // Number pad
      VStack(spacing: 15) {
        ForEach(0..<3) { row in
          HStack(spacing: 30) {
            ForEach(1..<4) { col in
              let number = row * 3 + col
              Button(action: {
                enteredNumber += "\(number)"
              }) {
                Text("\(number)")
                  .font(.title)
                  .frame(width: 70, height: 70)
                  .background(Color.gray.opacity(0.2))
                  .cornerRadius(35)
              }
            }
          }
        }
        
        HStack(spacing: 30) {
          Button(action: {
            // Clear button
            if !enteredNumber.isEmpty {
              enteredNumber.removeLast()
            }
          }) {
            Image(systemName: "delete.left")
              .font(.title)
              .frame(width: 70, height: 70)
              .background(Color.gray.opacity(0.2))
              .cornerRadius(35)
          }
          
          Button(action: {
            enteredNumber += "0"
          }) {
            Text("0")
              .font(.title)
              .frame(width: 70, height: 70)
              .background(Color.gray.opacity(0.2))
              .cornerRadius(35)
          }
          
          Button(action: {
            // Clear all button
            enteredNumber = ""
          }) {
            Text("C")
              .font(.title)
              .frame(width: 70, height: 70)
              .background(Color.gray.opacity(0.2))
              .cornerRadius(35)
          }
        }
      }
      .padding()
      
      // Submit button
      Button(action: {
        let result: NSDictionary = ["response": "Payment Successful", "enteredNumber": enteredNumber]
        callback(["action": "paymentSuccess"])
        presentationMode.wrappedValue.dismiss()
      }) {
        Text("Submit")
          .font(.title3)
          .fontWeight(.bold)
          .foregroundColor(.white)
          .frame(width: 200, height: 50)
          .background(Color(red: 0.1, green: 0.2, blue: 0.5))
          .cornerRadius(25)
      }
      .padding(.top, 20)
      .padding(.bottom, 30)
      
      Spacer()
    }
    .edgesIgnoringSafeArea(.bottom)
  }
}
