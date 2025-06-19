#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeBridge, NSObject)
RCT_EXTERN_METHOD(openSwiftUIScreen:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(openUPIHomeScreen:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(openPinScreen:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock)callback)

@end