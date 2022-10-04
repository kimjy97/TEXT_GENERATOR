var ctt, inputctt, tagType, toggle = 0, toggle2 = 0, temp = 0;
var array = [];
var lineHeight = 20;
var inputHeight = 40;
var stopArray = false;
var fileArray = [];
var modifyValue = true;
var changeValue = false;
var filter = "win16|win32|win64|mac|macintel";
var deviceType;

window.onload = function () {
    ctt = document.getElementById("contents");
    inputctt = document.getElementById("inputContents");
    tagType = document.getElementById("tagTypeName");
    saveContainer = document.getElementById("saveInputContainer");
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            deviceType = "mobile";
        } else {
            deviceType = "pc";
        }
    }
    totalByte2();
}

function writeContent() {
    if (inputctt.value != "") {
        if (changeValue == true) {
            document.getElementById("contents").innerHTML = ctt.innerHTML + inputctt.value;
        } else {
            document.getElementById("contents").innerHTML = inputctt.value;
        }
        array.push(inputctt.value);
        inputctt.value = "";
        tagType.innerHTML = "<b>NONE</b>";
        inputctt.focus();
        window.scrollTo(0, document.body.scrollHeight);
        temp = 0;
        toggle2 = 0;
        changeValue = true;
        inputExtend(false);
    }
}

function typeSelect(e) {
    switch (inputctt.value) {
        case "<p":
            inputctt.value = "<p></p>";
            tagType.innerHTML = "<b>&ltP&gt</b>";
            inputctt.setSelectionRange(3, 3);
            break;

        case "<d":
            inputctt.value = "<div></div>";
            tagType.innerHTML = "<b>&ltDIV&gt</b>";
            inputctt.setSelectionRange(5, 5);
            break;

        case "<s":
            inputctt.value = "<span></span>";
            tagType.innerHTML = "<b>&ltSPAN&gt</b>";
            inputctt.setSelectionRange(6, 6);
            break;
    }
}

function arrayLoad(e) {
    if (stopArray == false) {
        if (e.keyCode === 38) {
            if (array.length - temp > 0) {
                temp += 1;
                inputctt.value = array[array.length - temp];
            }
        } else
            if (e.keyCode === 40) {
                if (temp > 1) {
                    temp -= 1;
                    inputctt.value = array[array.length - temp];
                }
            } else {
                stopArray = true;
            }
    }
    if (inputctt.value == "") {
        stopArray = false;
        temp = 0;
    }
    inputExtend(numOfLines(document.getElementById("inputContents"), lineHeight));
}

function numOfLines(ta, lh) {
    var h0 = ta.style.height;
    ta.style.height = 'auto';
    var h1 = ta.scrollHeight;
    ta.style.height = h0;
    lineNum = Math.ceil(h1 / lh) - 1;
    return Math.ceil(h1 / lh) - 1 >= 2;
}

function totalByte() {
    var totalByte = 0;
    var oneChar = "";
    var str = "";
    for (var i = 0; i < document.getElementById("inputContents").value.length; i++) {
        oneChar = document.getElementById("inputContents").value.charAt(i);
        if (escape(oneChar).length > 4) {
            totalByte += 2;
        } else {
            totalByte++;
        }
    }
    str = totalByte + " byte";
    document.getElementById("byteCount").innerText = str;
}

function totalByte2() {
    var totalByte2 = 0;
    var oneChar2 = "";
    var str2 = "";
    for (var i = 0; i < document.getElementById("contents").innerHTML.length; i++) {
        oneChar2 = document.getElementById("contents").innerHTML.charAt(i);
        if (escape(oneChar2).length > 4) {
            totalByte2 += 2;
        } else {
            totalByte2++;
        }
    }
    totalByte2 = totalByte2 / 1024;
    str2 = totalByte2.toFixed(2) + ' / ' + "5120 KB";
    document.getElementById("docByte").innerText = str2;
    return totalByte2;
}

function inputExtend(bool) {
    if (bool) {
        open();
    } else {
        close();
    }
    function open() {
        document.getElementById("inputcontentsContainer2").style.height = "115px";
        document.getElementById("tagType").style.height = "33px";
        document.getElementById("contentsContainer").style.marginBottom = "160px";
        document.getElementById("byteCount").style.visibility = "visible";
    }

    function close() {
        document.getElementById("inputcontentsContainer2").style.height = "35px";
        document.getElementById("tagType").style.height = "33px";
        document.getElementById("contentsContainer").style.marginBottom = "45px";
        document.getElementById("byteCount").style.visibility = "hidden";
    }
}

function copyAll() {
    /*const tempArea = document.createElement("textarea");
    document.body.appendChild(tempArea);
    tempArea.value = ctt.innerHTML;
    tempArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempArea);*/
    window.navigator.clipboard.writeText(ctt.innerHTML);
    alert("HTML코드가 복사되었습니다.");
}

function saveVisible() {
    if (toggle == 0) {
        if (modifyValue == true) {
            saveContainer.style.visibility = "visible";
            saveContainer.animate({ opacity: [0, 1] }, { duration: 200, fill: 'forwards', easing: 'ease' });
            document.getElementById("saveButton").style.backgroundColor = "#eeeeee";
            toggle = 1;
        } else {
            alert("수정 및 저장이 불가능한 파일입니다.");
        }
    } else {
        saveContainer.style.visibility = "hidden";
        document.getElementById("saveButton").style.backgroundColor = "#ffffff";
        toggle = 0;
    }
    document.getElementById("filenameInput").focus();
    document.getElementById("filenameInput").setSelectionRange(0, $("#filenameInput").val().length - 4);
}

function saveAll() {
    var filename = document.getElementById("filenameInput").value;
    if (filename == ".txt") {
        alert("파일명을 입력해주세요.");
    } else if (filename.includes('/')) {
        alert("사용하지 못하는 문자 '/' 가 입력되었습니다.");
    } else if (filename.includes(' ')) {
        alert("사용하지 못하는 문자 ' ' 가 입력되었습니다.");
    } else {
        if (isIE() == 0) {
            /*  로컬 저장  */
            /*var blob = new Blob([ctt.innerHTML], { type: 'text/plain' });
            objURL = window.URL.createObjectURL(blob);
 
            if (window.__Xr_objURL_forCreatingFile__) {
                window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
            }
            window.__Xr_objURL_forCreatingFile__ = objURL;
            var a = document.createElement('a');
            a.download = document.getElementById("filenameInput").value;
            a.href = objURL;
            a.click();*/
            if (modifyValue == true) {
                changeValue = false;
                saveIntoServer();
                hidden();
            } else {
                alert("수정 및 저장이 불가능한 파일입니다.");
            }

        } else {/*
                var blob = new Blob([ctt.innerHTML], { type: "text/plain", endings: "native" });
                window.navigator.msSaveOrOpenBlob(blob, document.getElementById("filenameInput").value);
                saveIntoServer();*/
            if (modifyValue == true) {
                changeValue = false;
                saveIntoServer();
                hidden();
            } else {
                alert("수정 및 저장이 불가능한 파일입니다.");
            }
        }
    }

    function saveIntoServer() {
        if (totalByte2() < 5120) {
            $.ajax({
                url: "request.php",
                method: "POST",
                data: { action: "save", contents: ctt.innerHTML, name: document.getElementById("filenameInput").value, byte: totalByte2() },
                success: function (data) {
                    if (initData() == true) {
                        setTimeout(function () { if (document.getElementById(filename) == null) alert("fileload error"); else libraryScroll(document.getElementById(filename)) }, 500);
                    }
                    switch (data) {
                        case "overlap":
                            alert("파일명이 같은 파일이 있습니다.\n다른 파일명을 입력해주세요.");
                            break;
                        case "oversize":
                            alert("서버에 저장할 수 있는 최대용량을 초과했습니다.");
                            break;
                        case "success":
                            initData();
                            document.getElementById("fileName").innerText = '( ' + document.getElementById("filenameInput").value + ' )';
                            $.get('file/' + document.getElementById("filenameInput").value, function (data) { loadData(data, document.getElementById(document.getElementById("filenameInput").value)); });
                            break;
                    }

                    return data;
                },
                error: function () {
                    alert("알수없는 오류가 발생하였습니다.");
                    return "error";
                }
            });
        } else {
            alert("현재 작성중인 문서가 최대용량을 초과했습니다. (max : 5120 Kbyte)");
        }
    }

    function isIE() {
        return (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) ||
            navigator.userAgent.toLowerCase().indexOf("msie") !== -1;
    }

    function hidden() {
        saveContainer.style.visibility = "hidden";
        document.getElementById("saveButton").style.backgroundColor = "#ffffff";
        toggle = 0;
    }
}

function deleteAll() {
    result = window.confirm('※ 내용을 모두 지우시겠습니까?', { buttons: { Ok: true, Cancel: false }, focus: 1 });
    if (result == 1)
        ctt.innerHTML = "";
    else
        return;
}

function addFile() {
    if (changeValue == false) {
        document.getElementById("fileName").innerText = "( new.txt )";
        document.getElementById("filenameInput").innerText = "new.txt";
        document.getElementById("contents").innerHTML = '<div align="center" style="color:rgb(165,165,165);" data-toglle="tooltip" title="이 문구는 태그를 입력하면 사라집니다."><h2>Hello World!</h2>여러가지 HTML 태그들을 입력해 출력해보세요!<br><br></div>';
        totalByte2();
        $('.fileList').css('background-color', 'white');
        $('.fileList > p').css('font-weight', 'normal');
        $('.deleteFile').hide();
    } else {
        result = window.confirm('※ 현재 작성하고 있는 내용이 초기화됩니다.\n그래도 새로 파일을 만드시겠습니까?', { buttons: { Ok: true, Cancel: false }, focus: 1 });
        if (result == 1) {
            document.getElementById("fileName").innerText = "( new.txt )";
            document.getElementById("filenameInput").innerText = "new.txt";
            document.getElementById("contents").innerHTML = '<div align="center" style="color:rgb(165,165,165);" data-toglle="tooltip" title="이 문구는 태그를 입력하면 사라집니다."><h2>Hello World!</h2>여러가지 HTML 태그들을 입력해 출력해보세요!<br><br></div>';
            totalByte2();
            changeValue = false;

            $('.fileList').css('background-color', 'white');
            $('.fileList > p').css('font-weight', 'normal');
            $('.deleteFile').hide();
        } else {
            return;
        }
    }

}

function changeTag() {
    inputctt.focus();
    switch (toggle2) {
        case 0:
            inputctt.value = "<p></p>";
            tagType.innerHTML = "<b>&ltP&gt</b>";
            inputctt.setSelectionRange(3, 3);
            toggle2 = 1;
            break;
        case 1:
            inputctt.value = "<span></span>";
            tagType.innerHTML = "<b>&ltSPAN&gt</b>";
            inputctt.setSelectionRange(6, 6);
            toggle2 = 2;
            break;
        case 2:
            inputctt.value = "<div></div>";
            tagType.innerHTML = "<b>&ltDIV&gt</b>";
            inputctt.setSelectionRange(5, 5);
            toggle2 = 3;
            break;
        case 3:
            inputctt.value = "";
            tagType.innerHTML = "NONE";
            inputctt.setSelectionRange(0, 0);
            toggle2 = 0;
            break;
    }
}

/*JQuery 코드*/

function fileLoad(tg) {
    if ($(tg).closest("div").css('background-color') != 'rgb(240, 240, 255)') {
        if (tg.innerText == "info.txt" || tg.innerText == "readme.txt") {
            modifyValue = false;
        } else {
            modifyValue = true;
        }

        $.ajax({
            url: "getText.php",
            method: "POST",
            data: { name: tg.innerText },
            beforeSend: function () {
                 
            },
            success: function (data) {
                if (changeValue == true) {
                    result = window.confirm('※ 현재 작성하고 있는 내용이 초기화됩니다.\n그래도 파일 [ ' + tg.innerText + ' ]을 열겠습니까?', { buttons: { Ok: true, Cancel: false }, focus: 1 });
                    if (result == 1) {
                        loadData(data, tg);
                        changeValue = false;
                    } else {
                        return;
                    }
                } else {
                    loadData(data, tg);
                }
            }
            , error: function () {
                alert("에러 발생");
            }
        });


    }
}
function loadData(data, tg) {
    $('#contentsType > p').text('( ' + tg.innerText + ' )');
    $('#contents').html(data);
    $('.fileList').css('background-color', 'white');
    $('.fileList > p').css('font-weight', 'normal');
    $('.deleteFile').hide();
    if (deviceType == "pc") {
        $('.fileList').hover(function () {
            $(this).css('background-color', '#f3f3ff');
            $(this).find('img.deleteFile').show();
        }, function () {
            $(this).css('background-color', 'white');
            $(this).find('img.deleteFile').hide();
        });
    }
    $(tg).closest("div").off('mouseenter mouseleave');
    $(tg).closest("div").find('img.deleteFile').show();
    $(tg).css('font-weight', 'bold');
    $(tg).children('p').css('font-weight', 'bold');
    $(tg).closest("div").css('background-color', 'rgb(240, 240, 255)');
    totalByte2();
    $('#filenameInput').val(tg.innerText);
    $('#contentsContainer').css({ opacity: 0.5 })
    $('#contentsContainer').animate({ opacity: 1 }, 150);
    $('html').scrollTop(0);
    sidemenuOpen(false);
}

$(document).ready(function () {
    initData();

    $("#searchInput").focus(function () {
        $("#searchInput").css('color', 'black');
        $("#searchBar").css('background-color', 'white');
        if ($("#searchInput").val() == "search") {
            $("#searchInput").val("");
        }
    });

    $("#searchInput").blur(function () {
        $("#searchInput").css('color', '#9d9d9d');
        $("#searchBar").css('background-color', 'rgb(239, 239, 239)');
        if ($("#searchInput").val() == "") {
            $("#searchInput").val("search");
        }
    });

    $("#inputContents").focus(function () {
        inputExtend(numOfLines(document.getElementById("inputContents"), lineHeight));
    });

    $("#inputContents").blur(function () {
        inputExtend(false);
    });

    $("#searchButton").click(function () {
        var nameSplit = $('#searchInput').val();
        var spliting = nameSplit.split(".");
        var splitId = spliting[0] + '.txt';
        var scrollLeft;
        var _scrollX;
        $.get('file/' + splitId, function (data) {
            if (changeValue == true) {
                result = window.confirm('※ 현재 작성하고 있는 내용이 초기화됩니다.\n그래도 파일 [ ' + splitId + ' ]을 열겠습니까?', { buttons: { Ok: true, Cancel: false }, focus: 1 });
                if (result == 1) {
                    loadData(data, document.getElementById(splitId));
                    libraryScroll(document.getElementById(splitId));
                } else {
                    return;
                }
            } else {
                loadData(data, document.getElementById(splitId));
                libraryScroll(document.getElementById(splitId));
            }
        });
    });

    $("#scrolltopButton").click(function () {
        if ($('html').scrollTop() == 0) {
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            $('html').scrollTop(0);
        }
    });

    $("#bodyContainer").on('click', function () {
        if ($("#sidemenuButton").css('left') == '270px') {
            sidemenuOpen(false);
        }
    });

    $("#sidemenuButton").click(function () {
        if ($('#sideMenuContainer').css('left') == '-250px') {
            sidemenuOpen(true);
        } else {
            sidemenuOpen(false);
        }
    });
});

function sidemenuOpen(bool) {
    if ($("#sidemenuButton").css('top') == '20px') {
        if (bool) {
            $("#sidemenuButton").css('left', "270px");
            $('#sideMenuContainer').css('left', "0px");
        } else {
            $("#sidemenuButton").css('left', "20px");
            $('#sideMenuContainer').css('left', "-250px");
        }
    }
}

function scrollbuttonMotion() {
    if ($('html').scrollTop() < 10) {
        $('#scrolltopButton > p').css('transform', 'rotate(-180deg)');
        $('#scrolltopButton > p').css('padding-left', '5px');
    } else {
        $('#scrolltopButton > p').css('transform', 'rotate(0deg)');
        $('#scrolltopButton > p').css('padding-left', '0px');
    }
}

function libraryScroll(tg) {
    scrollTop = $(tg).offset().top;
    _scrollY = $("#libraryContainer").scrollTop();
    $("#libraryContainer").scrollTop(_scrollY + scrollTop - 80);

    return ture;
}

function initData() {
    var act = "fetch";
    $.ajax({
        url: "request.php",
        method: "POST",
        data: { action: act },
        beforeSend: function () {
            $('#libraryContainer').html('<div align="center" style="display:flex; height: 100%; justify-content:center; align-items:center; font-size: 0.85rem; color: rgb(210,210,210);">loading...</div>'); 
        },
        success: function (data) {
            $('#libraryContainer').html(data);
            $('.fileList').css({ opacity: 0 })
            $('.fileList').animate({ opacity: 1 }, 250);
            $('.deleteFile').hide();
            $('.deleteFile').on('click', function () {
                result = window.confirm('※ 파일 [ ' + $(this).closest("div").attr('id') + ' ]를 삭제하시겠습니까?', { buttons: { Ok: true, Cancel: false }, focus: 1 });
                if (result == 1) {
                    $.ajax({
                        url: "request.php",
                        method: "POST",
                        data: { action: "remove", name: $(this).closest("div").attr('id') },
                        success: function (data) {
                            initData();

                        },
                        error: function () {
                            alert("알수없는 오류가 발생하였습니다.");
                        }
                    });
                } else {
                    return;
                }

            });
            if (deviceType == "pc") {
                $('.fileList').hover(function () {
                    $(this).css('background-color', '#f3f3ff');
                    $(this).find('img.deleteFile').show();
                }, function () {
                    $(this).css('background-color', 'white');
                    $(this).find('img.deleteFile').hide();
                });
            }
        },
        error: function () {
            alert("에러 발생");
        }
    });
    return true;
}

$(window).scroll(function () {
    var heightV = $(window).scrollTop();
    if ($(window).outerWidth() > 800) {
        if (heightV < 150) {
            var y = (-3 * heightV / 500) + 2.8;
            var z = (-1 * heightV / 500) + 1;
            var w = (-2 * heightV / 500) + 2;
            $('#mainTitle').css('font-size', y + "rem");
            $('#subTitle').css('font-size', z + "rem");
            $('#project_title').css('padding-top', w + "rem");
            $('#project_title').css('padding-bottom', w + "rem");
        }
    }
    scrollbuttonMotion();
});


/*반응형 구현*/
$(window).resize(function () {
    if ($(window).outerWidth() < 900) {
        $('#mainTitle').css('font-size', "1.8rem");
        $('#subTitle').css('font-size', "0.8rem");
        $('#project_title').css('padding-top', "1.5rem");
        $('#project_title').css('padding-bottom', "1.5rem");
    } else {
        var heightV = $(window).scrollTop();
        if (heightV < 150) {
            var y = (-3 * heightV / 500) + 2.8;
            var z = (-1 * heightV / 500) + 1;
            var w = (-2 * heightV / 500) + 2;
            $('#mainTitle').css('font-size', y + "rem");
            $('#subTitle').css('font-size', z + "rem");
            $('#project_title').css('padding-top', w + "rem");
            $('#project_title').css('padding-bottom', w + "rem");
        }
    }

    if ($(window).outerWidth() > 1024) {
        $('#contentsContainer').css('width', "70%");
        $('#inputContents').css('width', "100%");
        $('#sideMenuContainer').css('left', "0");
        $('#bodyContainer').css('width', "calc(100% - 250px)");
        $('#titleContainer').css('width', "calc(100% - 250px)");
        $('#inputcontentsContainer').css('width', "calc(100% - 250px)");
        $('#inputcontentsContainer2').css('width', "75%");
        $('#sidemenuButton').css('top', '-100px');
        $("#sidemenuButton").css('left', "20px");
    } else if ($(window).outerWidth() > 900) {
        $('#contentsContainer').css('width', "800px");
        $('#inputContents').css('width', "650px");
        $('#sideMenuContainer').css('left', "-250px");
        /*$('#sideMenuContainer').css('visibility', "hidden");*/
        $('#bodyContainer').css('width', "100%");
        $('#titleContainer').css('width', "100%");
        $('#inputcontentsContainer').css('width', "100%");
        $('#inputcontentsContainer2').css('width', "100%");
        $('#sidemenuButton').css('top', '20px');
        $("#sidemenuButton").css('left', "20px");
    } else {
        $('#contentsContainer').css('width', "90%");
        $('#inputContents').css('width', "100%");
        $('#sideMenuContainer').css('left', "-250px");
        /*$('#sideMenuContainer').css('visibility', "hidden");*/
        $('#bodyContainer').css('width', "100%");
        $('#titleContainer').css('width', "100%");
        $('#inputcontentsContainer').css('width', "100%");
        $('#inputcontentsContainer2').css('width', "95%");
        $('#sidemenuButton').css('top', '20px');
        $("#sidemenuButton").css('left', "20px");

    }
});