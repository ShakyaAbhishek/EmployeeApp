package com.wellcurve;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.calendarevents.CalendarEventsPackage;
import io.invertase.firebase.RNFirebasePackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
// import cl.json.ShareApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnative.googlefit.GoogleFitPackage;
import com.reactnative.samsunghealth.SamsungHealthPackage;  // add this line 
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.airbnb.android.react.maps.MapsPackage;
 

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
            new RNFusedLocationPackage(),
            new CalendarEventsPackage(),
            new RNFirebasePackage(),
            new GoogleFitPackage(BuildConfig.APPLICATION_ID),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new PickerPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new ReactVideoPackage(),
            new SvgPackage(),
            new ImagePickerPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new SamsungHealthPackage(BuildConfig.APPLICATION_ID),
            new MapsPackage()
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
