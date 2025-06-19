package com.rnwithswiftui

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*

class MyNativeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    companion object {
        var openUPICallback: Callback? = null
        var openPinCallback: Callback? = null
    }

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName() = "NativeBridge"

    @ReactMethod
    fun openUPIHomeScreen(data: ReadableMap, callback: Callback) {
        val activity = currentActivity

        if (activity != null) {
            val intent = Intent(activity, UpiCircle::class.java)
            openUPICallback = callback
            activity.startActivityForResult(intent, 1001)
        } else {
            callback.invoke("Error: Current activity is null")
        }
    }


    @ReactMethod
    fun openPinScreen(data: ReadableMap, callback: Callback) {
        val activity = currentActivity
        
        val intent = Intent(activity, NativeScreenActivity::class.java) // New Activity for PIN screen

        val mobileNumber = data.getString("mobileNumber")
        val amount = data.getString("amount")

        intent.putExtra("mobileNumber", mobileNumber)
        intent.putExtra("amount", amount)

        openPinCallback = callback // store callback for PIN screen

        activity?.startActivityForResult(intent, 1002)
    }

    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, intent: Intent?) {
        if (requestCode == 1001 && resultCode == Activity.RESULT_OK) {
            val action = intent?.getStringExtra("action") ?: ""
            val resultMap = Arguments.createMap().apply {
                putString("action", action)
            }
            openUPICallback?.invoke(resultMap)
            openUPICallback = null
        } else if (requestCode == 1002 && resultCode == Activity.RESULT_OK) {
            val action = intent?.getStringExtra("action") ?: ""
            val resultMap = Arguments.createMap().apply {
                putString("action", action)
            }
            openPinCallback?.invoke(resultMap)
            openPinCallback = null
        }
    }

    override fun onNewIntent(intent: Intent) {}
}
