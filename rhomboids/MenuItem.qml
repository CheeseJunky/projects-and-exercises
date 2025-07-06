import QtQuick
import QtQuick.Effects

Item {
    id: menuItem

    transform: [
        Matrix4x4 {
            matrix: Qt.matrix4x4(1, root.shearFactor, 0, 0, 0, 1, 0, 0, 0, 0,
                                 1, 0, 0, 0, 0, 1)
        }
    ]
    z: root.numberOfTiles - index

    Rectangle {
        id: romb

        anchors.fill: parent

        property color tileColor: "#bc0dfd"
        property color tileBorderColor: "purple"

        color: tileColor
        border {
            color: tileBorderColor
            width: 2
        }
        radius: 8

        Item {
            id: straightInner
            anchors {
                fill: parent
            }

            transform: [
                Matrix4x4 {
                    matrix: Qt.matrix4x4(1, -root.shearFactor, 0, 0, 0, 1,
                                         0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }
            ]

            Text {
                anchors.centerIn: parent
                text: index + 1
                color: "white"
                font {
                    pixelSize: root.tileSize * 0.3
                    bold: true
                }
            }
        } // straightInner

    } // romb

    MultiEffect {
        source: romb
        anchors.fill: romb
        shadowBlur: 0.7
        shadowEnabled: true
        shadowColor: "black"
        shadowHorizontalOffset: 11
    }

} // menuItem
