package com.rnwithswiftui

import android.os.Bundle
import android.app.Activity
import android.content.Intent
import android.widget.Button
import android.widget.ImageView
import android.widget.FrameLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowInsetsCompat

class UpiCircle : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_upi_circle)


		val sendBackButton = findViewById<FrameLayout>(R.id.frame)
		sendBackButton.setOnClickListener {
			val resultIntent = Intent()
			resultIntent.putExtra("action", "openPaymentDetails")
			setResult(Activity.RESULT_OK, resultIntent)
			finish()
		}
    }
}