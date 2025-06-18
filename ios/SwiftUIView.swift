import SwiftUI


struct SwiftUIView: View {
  let data: NSDictionary
  let callback: (NSDictionary) -> Void
  
  @State private var text: String = ""
  @Environment(\.presentationMode) var presentationMode
  
  var body: some View {
    NavigationView {
      VStack {
        Text("SwiftUI Screen")
          .font(.title)
          .padding()
        
        Text("Data from React Native: \(data["message"] as? String ?? "")")
          .padding()
        
        TextField("Enter text", text: $text)
          .textFieldStyle(RoundedBorderTextFieldStyle())
          .padding()
        
        Button("Send Data Back") {
          let result: NSDictionary = ["response": text]
          callback(result)
          presentationMode.wrappedValue.dismiss()
        }
        .padding()
      }
      .padding()
      .navigationTitle("SwitftUI")
      .navigationBarTitleDisplayMode(.large)
    }
  }
}
