package com._spotify;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lufinkey.react.spotify.RCTSpotifyPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import io.invertase.firebase.RNFirebasePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.cmcewen.blurview.BlurViewPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.lufinkey.react.spotify.RCTSpotifyPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RCTSpotifyPackage(),
            new ReactNativeI18n(),
            new RNFirebasePackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new BlurViewPackage(),
            new RNFirebasePackage(),
            new BlurViewPackage(),
            new ReactNativeConfigPackage(),
            new RCTSpotifyPackage(),
            new ReactNativeI18n(),
            new VectorIconsPackage(),
            new RNDeviceInfo()
      );
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
  }
}
