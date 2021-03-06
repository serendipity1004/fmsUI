'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('CopyPaste', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  var arrayOfArrays = function arrayOfArrays() {
    return [['', 'Kia', 'Nissan', 'Toyota', 'Honda'], ['2008', 10, 11, 12, 13], ['2009', 20, 11, 14, 13], ['2010', 30, 15, 12, 13]];
  };

  describe('enabling/disabing plugin', function () {
    it('should copyPaste be set enabled as default', function () {
      var hot = handsontable();

      expect(hot.getSettings().copyPaste).toBeTruthy();
      expect(hot.getPlugin('CopyPaste').textarea).toBeDefined();
    });

    it('should do not create textarea element if copyPaste is disabled on initialization', function () {
      handsontable({
        copyPaste: false
      });

      expect($('#HandsontableCopyPaste').length).toEqual(0);
    });
  });

  describe('working with multiple tables', function () {
    beforeEach(function () {
      this.$container2 = $('<div id="' + id + '2"></div>').appendTo('body');
    });

    afterEach(function () {
      if (this.$container2) {
        this.$container2.handsontable('destroy');
        this.$container2.remove();
      }
    });

    it('should disable copyPaste only in particular table', function () {
      var hot1 = handsontable();
      var hot2 = spec().$container2.handsontable({ copyPaste: false }).handsontable('getInstance');

      expect(hot1.getPlugin('CopyPaste').textarea).toBeDefined();
      expect(hot2.getPlugin('CopyPaste').textarea).toBeUndefined();
    });

    it('should create only one HandsontableCopyPaste regardless of the number of tables', function () {
      handsontable();
      spec().$container2.handsontable();

      expect($('#HandsontableCopyPaste').length).toEqual(1);
    });

    it('should leave HandsontableCopyPaste as long as at least one table has copyPaste enabled', function () {
      var hot1 = handsontable();
      var hot2 = spec().$container2.handsontable().handsontable('getInstance');

      expect($('#HandsontableCopyPaste').length).toEqual(1);

      hot1.updateSettings({ copyPaste: false });

      expect($('#HandsontableCopyPaste').length).toEqual(1);

      hot2.updateSettings({ copyPaste: false });

      expect($('#HandsontableCopyPaste').length).toEqual(0);
    });
  });

  describe('setting values copyable', function () {
    it('should set copyable text when selecting a single cell and hitting ctrl', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      var copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0);
      keyDownUp(Handsontable.helper.KEY_CODES.CONTROL_LEFT);

      expect(copyPasteTextarea.value).toEqual('A1');
    });

    it('should set copyable text when selecting a single cell and hitting left command', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      var copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0);
      keyDownUp(Handsontable.helper.KEY_CODES.COMMAND_LEFT);

      expect(copyPasteTextarea.value).toEqual('A1');
    });

    it('should set copyable text when selecting a single cell and hitting right command', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      var copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0);
      keyDownUp(Handsontable.helper.KEY_CODES.COMMAND_RIGHT);

      expect(copyPasteTextarea.value).toEqual('A1');
    });

    it('should set copyable text when selecting multiple cells and hitting ctrl', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      var copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0, 1, 0);
      keyDownUp(Handsontable.helper.KEY_CODES.CONTROL_LEFT);

      expect(copyPasteTextarea.value).toEqual('A1\nA2');
    });

    it('should set copyable text when selecting all cells with CTRL+A', function (done) {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      var copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0);

      $(document.activeElement).simulate('keydown', { keyCode: Handsontable.helper.KEY_CODES.A, ctrlKey: true });

      setTimeout(function () {
        expect(getSelected()).toEqual([0, 0, 1, 1]);
        expect(copyPasteTextarea.value).toEqual('A1\tB1\nA2\tB2');
        done();
      }, 10);
    });

    it('should not throw error when no cell is selected (#1221)', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      selectCell(0, 0);
      deselectCell();

      function keydownCtrl() {
        $(document).simulate('keydown', {
          keyCode: Handsontable.helper.KEY_CODES.COMMAND_LEFT
        });
      }

      // expect no to throw any exception
      expect(keydownCtrl).not.toThrow();
    });

    it('should not throw error when no cell is selected and contextmenu options was clicked', function () {
      // This is ugly trick to check problematic thing (#4390).
      // Unfortunately we cannot open the context menu, when event.target is not an TD element.
      // TODO: we have to looking for a solution for way to test contextMenu in similar use cases.
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      // expect no to throw any exception
      expect(function () {
        hot.getPlugin('CopyPaste').setCopyableText();
      }).not.toThrow();
    });

    it('should set copyable text when selecting a single cell with specified type and hitting ctrl (#1300)', function () {
      handsontable({
        data: [['A', 1], ['B', 2]],
        columns: [{ type: 'text' }, { type: 'numeric' }]
      });

      var copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0, 1, 1);
      keyDownUp(Handsontable.helper.KEY_CODES.CONTROL_LEFT);

      expect(copyPasteTextarea.value).toEqual('A\t1\nB\t2');
    });

    it('should set copyable text when selecting a single cell with editor type as false (#2574)', function () {
      handsontable({
        data: [['A', 1], ['B', 2]],
        columns: [{ type: 'text' }, { editor: false }]
      });

      var copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(1, 1, 1, 1);
      keyDownUp(Handsontable.helper.KEY_CODES.CONTROL_LEFT);

      expect(copyPasteTextarea.value).toEqual('2');
    });

    it('should set copyable text until copyRowsLimit is reached', function () {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          rowsLimit: 2
        }
      });

      selectCell(0, 0, countRows() - 1, countCols() - 1); // selectAll
      keyDownUp('ctrl');

      // should prepare 2 rows for copying
      expect($('#HandsontableCopyPaste')[0].value).toEqual('\tKia\tNissan\tToyota\tHonda\n2008\t10\t11\t12\t13');
    });

    it('should set copyable text until copyColsLimit is reached', function () {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          columnsLimit: 2
        }
      });

      selectCell(0, 0, countRows() - 1, countCols() - 1); // selectAll
      keyDownUp('ctrl');

      // should prepare 2 columns for copying
      expect($('#HandsontableCopyPaste')[0].value).toEqual('\tKia\n2008\t10\n2009\t20\n2010\t30');
    });

    it('should call onCopyLimit callback when copy limit was reached', function () {
      var result = void 0;

      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          rowsLimit: 2,
          columnsLimit: 2
        },
        afterCopyLimit: function afterCopyLimit(selectedRowsCount, selectedColsCount, copyRowsLimit, copyColsLimit) {
          result = [selectedRowsCount, selectedColsCount, copyRowsLimit, copyColsLimit];
        }
      });

      selectCell(0, 0, countRows() - 1, countCols() - 1); // selectAll
      keyDownUp('ctrl');
      expect(result).toEqual([4, 5, 2, 2]);
    });
  });

  describe('copy', function () {
    it('should be possible to copy data by keyboard shortcut', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      selectCell(1, 1);
      keyDown('ctrl');
      keyDown('ctrl+c');

      expect($('#HandsontableCopyPaste')[0]).toBe(document.activeElement);
      // unfortunately we have not access to read data from the system clipboard
    });

    it('should be possible to copy data by API', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      selectCell(1, 0);

      hot.getPlugin('CopyPaste').setCopyableText();
      // below line is cause of console warning in FF about execCommand
      hot.getPlugin('CopyPaste').copy(true);

      expect($('#HandsontableCopyPaste')[0]).toBe(document.activeElement);
      // unfortunately we have not access to read data from the system clipboard
    });

    it('should be possible to copy data by contextMenu option', function () {
      var beforeCopySpy = jasmine.createSpy('beforeCopy');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCopy: beforeCopySpy,
        contextMenu: ['copy']
      });

      selectCell(0, 1);
      contextMenu();

      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');

      actions.simulate('mousedown');

      expect(beforeCopySpy).toHaveBeenCalledTimes(1);
    });

    it('should call beforeCopy and afterCopy during copying operation', function () {
      var beforeCopySpy = jasmine.createSpy('beforeCopy');
      var afterCopySpy = jasmine.createSpy('afterCopy');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCopy: beforeCopySpy,
        afterCopy: afterCopySpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      keyDown('ctrl+c');

      expect(beforeCopySpy.calls.count()).toEqual(1);
      expect(beforeCopySpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
      expect(afterCopySpy.calls.count()).toEqual(1);
      expect(afterCopySpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
    });

    it('should be possible to block copying', function () {
      var afterCopySpy = jasmine.createSpy('afterCopy');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCopy: function beforeCopy() {
          return false;
        },

        afterCopy: afterCopySpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      keyDown('ctrl+c');

      expect(afterCopySpy.calls.count()).toEqual(0);
    });

    it('should be possible modification of changes during copying', _asyncToGenerator(function* () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCopy: function beforeCopy(changes) {
          changes.splice(0, 1);
        }
      });

      selectCell(0, 0, 1, 0);
      keyDown('ctrl');
      keyDown('ctrl+c');

      yield sleep(60);

      expect($('#HandsontableCopyPaste')[0].value).toEqual('A2');
    }));
  });

  describe('cut', function () {
    it('should be possible to cut data by keyboard shortcut', _asyncToGenerator(function* () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      selectCell(1, 1);
      keyDown('ctrl');
      keyDown('ctrl+x');

      expect($('#HandsontableCopyPaste')[0]).toBe(document.activeElement);

      yield sleep(100);

      expect(hot.getDataAtCell(1, 1)).toBe('');
      // unfortunately we have not access to read data from the system clipboard
    }));

    it('should be possible to cut data by API', _asyncToGenerator(function* () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      selectCell(1, 0);

      hot.getPlugin('CopyPaste').setCopyableText();
      // below line is cause of console warning in FF about execCommand
      hot.getPlugin('CopyPaste').cut(true);

      expect($('#HandsontableCopyPaste')[0]).toBe(document.activeElement);

      yield sleep(100);

      expect(hot.getDataAtCell(1, 0)).toBe('');
      // unfortunately we have not access to read data from the system clipboard
    }));

    it('should be possible to cut data by contextMenu option', function () {
      var beforeCutSpy = jasmine.createSpy('beforeCopy');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCut: beforeCutSpy,
        contextMenu: ['cut']
      });

      selectCell(0, 1);
      contextMenu();

      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');

      actions.simulate('mousedown');

      expect(beforeCutSpy).toHaveBeenCalledTimes(1);
    });

    it('should call beforeCut and afterCut during cutting out operation', function () {
      var beforeCutSpy = jasmine.createSpy('beforeCut');
      var afterCutSpy = jasmine.createSpy('afterCut');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCut: beforeCutSpy,
        afterCut: afterCutSpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      keyDown('ctrl+x');

      expect(beforeCutSpy.calls.count()).toEqual(1);
      expect(beforeCutSpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
      expect(afterCutSpy.calls.count()).toEqual(1);
      expect(afterCutSpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
    });

    it('should be possible to block cutting out', function () {
      var afterCutSpy = jasmine.createSpy('afterCut');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCut: function beforeCut() {
          return false;
        },

        afterCut: afterCutSpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      keyDown('ctrl+x');

      expect(afterCutSpy.calls.count()).toEqual(0);
    });
  });

  describe('paste', function () {
    it('should not create new rows or columns when allowInsertRow and allowInsertColumn equal false', _asyncToGenerator(function* () {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_down'
        },
        allowInsertRow: false,
        allowInsertColumn: false
      });

      selectCell(3, 4); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      yield sleep(60);

      var expected = arrayOfArrays();
      expected[3][4] = 'Kia';
      expect(getData()).toEqual(expected);
    }));

    it('should shift data down instead of overwrite when paste (when allowInsertRow = false)', _asyncToGenerator(function* () {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_down'
        },
        allowInsertRow: false
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      yield sleep(60);

      expect(getData().length).toEqual(4);
      expect(getData(0, 0, 2, 4)).toEqual([['', 'Kia', 'Nissan', 'Toyota', 'Honda'], ['Kia', 'Nissan', 'Toyota', 12, 13], ['2008', 10, 11, 14, 13]]);
    }));

    it('should shift data down instead of overwrite when paste (minSpareRows > 0)', _asyncToGenerator(function* () {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_down'
        },
        minSpareRows: 1
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      yield sleep(60);

      expect(getData().length).toEqual(6);
      expect(getData(0, 0, 2, 4)).toEqual([['', 'Kia', 'Nissan', 'Toyota', 'Honda'], ['Kia', 'Nissan', 'Toyota', 12, 13], ['2008', 10, 11, 14, 13]]);
    }));

    it('should shift right insert instead of overwrite when paste', _asyncToGenerator(function* () {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_right'
        },
        allowInsertColumn: false
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      yield sleep(60);

      expect(getData()[0].length).toEqual(5);
      expect(getDataAtRow(1)).toEqual(['Kia', 'Nissan', 'Toyota', '2008', 10]);
    }));

    it('should shift right insert instead of overwrite when paste (minSpareCols > 0)', function (done) {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_right'
        },
        minSpareCols: 1
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      setTimeout(function () {
        expect(getData()[0].length).toEqual(9);
        expect(getDataAtRow(1)).toEqual(['Kia', 'Nissan', 'Toyota', '2008', 10, 11, 12, 13, null]);
        done();
      }, 60);
    });

    it('should not throw an error when changes are null in `once` hook', _asyncToGenerator(function* () {
      var errors = 0;

      try {
        handsontable({
          data: arrayOfArrays(),
          afterChange: function afterChange(changes, source) {
            if (source === 'loadData') {
              return;
            }

            loadData(arrayOfArrays());
          }
        });

        selectCell(1, 0); // selectAll
        triggerPaste('Kia\tNissan\tToyota');
      } catch (e) {
        errors++;
      }

      yield sleep(60);

      expect(errors).toEqual(0);
    }));

    it('should not paste any data, if no cell is selected', function (done) {
      var copiedData1 = 'foo';
      var copiedData2 = 'bar';

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(3, 1)
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');
      expect(getSelected()).toBeUndefined();

      triggerPaste(copiedData1);

      setTimeout(function () {
        expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
        expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
        expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');
      }, 100);

      setTimeout(function () {
        selectCell(1, 0, 2, 0);

        triggerPaste(copiedData2);
      }, 200);

      setTimeout(function () {
        expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
        expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual(copiedData2);
        expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual(copiedData2);
        done();
      }, 300);
    });

    it('should not paste any data, if no cell is selected (select/deselect cell using mouse)', _asyncToGenerator(function* () {
      var copiedData = 'foo';

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(3, 1)
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');

      spec().$container.find('tbody tr:eq(1) td:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(1) td:eq(0)').simulate('mouseup');

      expect(getSelected()).toEqual([1, 0, 1, 0]);

      $('html').simulate('mousedown').simulate('mouseup');

      expect(getSelected()).toBeUndefined();

      triggerPaste(copiedData);

      yield sleep(100);

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');
    }));

    it('should call beforePaste and afterPaste during pasting operation', _asyncToGenerator(function* () {
      var beforePasteSpy = jasmine.createSpy('beforePaste');
      var afterPasteSpy = jasmine.createSpy('afterPaste');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforePaste: beforePasteSpy,
        afterPaste: afterPasteSpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      triggerPaste('Kia');

      yield sleep(60);

      expect(beforePasteSpy.calls.count()).toEqual(1);
      expect(beforePasteSpy).toHaveBeenCalledWith([['Kia']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);

      expect(afterPasteSpy.calls.count()).toEqual(1);
      expect(afterPasteSpy).toHaveBeenCalledWith([['Kia']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
    }));

    it('should be possible to block pasting', _asyncToGenerator(function* () {
      var afterPasteSpy = jasmine.createSpy('afterPaste');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforePaste: function beforePaste() {
          return false;
        },

        afterPaste: afterPasteSpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      triggerPaste('Kia');

      yield sleep(60);

      expect(afterPasteSpy.calls.count()).toEqual(0);
    }));

    it('should be possible modification of changes', _asyncToGenerator(function* () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforePaste: function beforePaste(changes) {
          changes.splice(0, 1);
        }
      });

      selectCell(0, 0);
      keyDown('ctrl');
      triggerPaste('Kia\nToyota');

      yield sleep(60);

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('Toyota');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
    }));
  });
});