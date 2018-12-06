package com.momanage;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import cn.jpush.reactnativejpush.JPushPackage;

import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.momanage.invokenative.DplusReactPackage;
import com.momanage.invokenative.RNUMConfigure;
import com.umeng.commonsdk.UMConfigure;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {


//        @Override
//        protected String getJSBundleFile() {
//        return CodePush.getJSBundleFile();
//        }
    
    

    private boolean SHUTDOWN_TOAST = false;

    private boolean SHUTDOWN_LOG = false;

    @Override protected String getJSBundleFile() {
      return CodePush.getJSBundleFile("index.android.bundle");
    }
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
              new FingerprintAuthPackage(),
//              new SplashScreenReactPackage(),
              new ContextModuleReactPackage(),
              new RNDeviceInfo(),
              new RandomBytesPackage(),
              new CodePush(getString(R.string.code_push), MainApplication.this, BuildConfig.DEBUG),
              new JPushPackage(SHUTDOWN_TOAST,SHUTDOWN_LOG),
              new DplusReactPackage());
    }

    @Nullable @Override
    protected  String getBundleAssetName(){
      return  "index.android.bundle";
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    RNUMConfigure.init(this,getString(R.string.rnum_appkey),getString(R.string.rnum_channel),UMConfigure.DEVICE_TYPE_PHONE,"");
  }
}
