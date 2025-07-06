import QtQuick

Window {
    width: 700
    height: 320
    visible: true
    title: qsTr("Hello World")

    Loader {
        id: mainLoader

        anchors {
            fill: parent
        }

        source: "RhomboidMenu.qml"
    }
}
