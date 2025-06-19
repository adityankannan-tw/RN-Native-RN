package com.rnwithswiftui

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView

class NativeScreenActivity : Activity() {

    private lateinit var enteredNumberTextView: TextView
    private var enteredNumber: String = ""

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_native_screen)

       val recipientNumber = findViewById<TextView>(R.id.recipient_number)
       val amountText = findViewById<TextView>(R.id.amount_text)

       val recipientNumberReceived = intent.getStringExtra("mobileNumber")
       val amountTextReceived = intent.getStringExtra("amount")

       recipientNumber.text = "Recipient Number: " + recipientNumberReceived
       amountText.text = "Amount : ₹" + amountTextReceived

       enteredNumberTextView = findViewById(R.id.entered_number)

       val submitButton = findViewById<Button>(R.id.submit_button)
       submitButton.setOnClickListener {
           val resultIntent = Intent()
           resultIntent.putExtra("enteredNumber", "paymentSuccess")

           setResult(Activity.RESULT_OK, resultIntent)
           finish()
       }

       val buttonIds = listOf(
           R.id.btn_0, R.id.btn_1, R.id.btn_2,
           R.id.btn_3, R.id.btn_4, R.id.btn_5,
           R.id.btn_6, R.id.btn_7, R.id.btn_8,
           R.id.btn_9
       )

       buttonIds.forEach { id ->
           val button = findViewById<Button>(id)
           button.setOnClickListener {
               val digit = button.text.toString()
               enteredNumber += digit
               enteredNumberTextView.text = enteredNumber
           }
       }

       val clearButton = findViewById<Button>(R.id.btn_clear)
       clearButton.setOnClickListener {
           if (enteredNumber.isNotEmpty()) {
               enteredNumber = enteredNumber.dropLast(1)
               enteredNumberTextView.text = enteredNumber
           }
       }

       val cancelButton = findViewById<Button>(R.id.btn_cancel)
       cancelButton.setOnClickListener {
           enteredNumber = ""
           enteredNumberTextView.text = ""
       }
    }
}
