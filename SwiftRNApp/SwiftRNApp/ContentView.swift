//
//  ContentView.swift
//  SwiftRNApp
//
//  Created by Adityan Kannan on 13/06/25.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Some text")
        ReactNativeView()
            .edgesIgnoringSafeArea(.all)
    }
}


#Preview {
    ContentView()
}
