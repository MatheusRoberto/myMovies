import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMaps, MarkerOptions, GoogleMapsEvent, Marker, LatLng, MyLocation } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  public coordenadas = { latitude: 0, longitude: 0 };
  map: GoogleMap;
  marker: Marker;

  constructor(public geolocation: Geolocation, private platform: Platform) {

  }

  async getCoordenadas() {
    this.map.clear();

    this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        duration: 5000
      });
    });

    const stream = await this.geolocation.watchPosition();
    await stream.subscribe(data => {
      this.coordenadas.latitude = data.coords.latitude;
      this.coordenadas.longitude = data.coords.longitude;
    });
    console.log(this.coordenadas);
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    this.map = GoogleMaps.create('map_canvas', {});
    await this.getCoordenadas();
    await this.addCinemas();
  }

  async localizar() {
    await this.getCoordenadas();
    const options: MarkerOptions = {
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.coordenadas.latitude,
        lng: this.coordenadas.longitude
      }
    };

    this.marker = await this.map.addMarker(options);

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(_ => {
      this.marker.setAnimation('BOUNCE');
    });
  }

  async addCinemas() {

    // Palladium
    let options: MarkerOptions = {
      icon: {
        url: 'assets/img/map_pin_64.png',
        size: {
          width: 64,
          heigth: 64
        }
      },
      animation: 'DROP',
      position: {
        lat: -25.0948427,
        lng: -50.1523016
      }
    };

    this.marker = await this.map.addMarker(options);

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(_ => {
      this.marker.setAnimation('BOUNCE');
    });

    // Total
    options = {
      icon: {
        url: 'assets/img/map_pin_64.png',
        size: {
          width: 64,
          heigth: 64
        }
      },
      animation: 'DROP',
      position: {
        lat: -25.0850869,
        lng: -50.1792762
      }
    };
    this.marker = await this.map.addMarker(options);

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(_ => {
      this.marker.setAnimation('BOUNCE');
    });
  }
}
