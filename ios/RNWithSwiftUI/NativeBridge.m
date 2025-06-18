#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeBridge, NSObject)
RCT_EXTERN_METHOD(openSwiftUIScreen:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock)callback)


@end
