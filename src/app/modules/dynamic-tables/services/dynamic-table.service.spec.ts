import { DynamicTableService } from './dynamic-table.service';

describe('DynamicTableService', () => {
  let service: DynamicTableService;

  beforeEach(() => {
    service = new DynamicTableService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
